const pageFunctions = require("./functions")
const userDb = require("../../data/db/user.db")
const loanDb = require("../../data/db/loan.db")
const transactionDb = require("../../data/db/transaction.db")

async function profile(req, res, next){
	let userObj = (await userDb.findOneWith({ user_id: req.params.user_id }))._doc
	let allHigherPurchaseTransactions = await pageFunctions.fetchTransactions({ user_id: userObj.user_id, type: "higher_purchase" })
	let higherPurchaseTransactions = await pageFunctions.fetchTransactions({ user_id: userObj.user_id, type: "higher_purchase" }, 10)
	let totalPayment = 0, remainingPayment = 0

	if(userObj)
		userObj.created_at = pageFunctions.createDate(userObj._id.getTimestamp()).getDate()

	higherPurchaseTransactions.forEach(transaction => {
		transaction._doc.created_at = pageFunctions.createDate(transaction._id.getTimestamp()).getHypenDate()
	})
	
	allHigherPurchaseTransactions.forEach(transaction => {
		if(transaction.status == "success")
			totalPayment += Number(transaction.amount)
	})

	remainingPayment = Number(userObj.plan.total_amount) - totalPayment

	let loanObj = await loanDb.findOneWith({ status: "approved", user_id: userObj.user_id })
	if(loanObj){
		loanObj._doc.weekly_payment = loanObj.final_amount / loanObj.weeks
		loanObj._doc.remaining_payment = loanObj.final_amount - await getTotalTransactions(loanObj._id)
	}

	let allLoans = await loanDb.findWith({ user_id: userObj.user_id }, null, { created_at: -1 }, 10)
	for(let i = 0; i < allLoans.length; i++){
		let loan = allLoans[i]
		loan._doc.created_at = pageFunctions.createDate(loan.created_at).getHypenDate()
	}
	
	req.body.pageData = {
		user: userObj,
		loan: loanObj,
		allLoans,
		higherPurchaseTransactions,
		totalPayment,
		remainingPayment
	}

	next()
}

module.exports = profile


async function getTotalTransactions(loan_id){
	console.log(loan_id)
	let allLoanTransactions = await transactionDb.findWith({ loan_id, status: "success" })
	console.log("All", allLoanTransactions)
	return allLoanTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)
}