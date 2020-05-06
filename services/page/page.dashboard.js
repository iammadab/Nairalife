const pageFunctions = require("./functions")
const loanDb = require("../../data/db/loan.db")
const transactionDb = require("../../data/db/transaction.db")

async function dashboard(req, res, next){
	let userObj = await pageFunctions.fetchUser(req.body.user.id)
	let higherPurchaseTransactions = await pageFunctions.fetchTransactions({ user_id: userObj.user_id, type: "higher_purchase" })
	let totalPayment = 0, remainingPayment = 0

	if(userObj)
		userObj.created_at = pageFunctions.createDate(userObj._id.getTimestamp()).getDate()

	higherPurchaseTransactions.forEach(transaction => {
		transaction._doc.created_at = pageFunctions.createDate(transaction._id.getTimestamp()).getHypenDate()
		if(transaction.status == "success")
			totalPayment += Number(transaction.amount)
	})

	remainingPayment = Number(userObj.plan.total_amount) - totalPayment

	let loanObj = await loanDb.findOneWith({ status: "approved", user_id: userObj.user_id })
	if(loanObj){
		loanObj._doc.weekly_payment = loanObj.final_amount / loanObj.weeks
		loanObj._doc.remaining_payment = loanObj.final_amount - await getTotalTransactions(loanObj._id)
	}
	
	req.body.pageData = {
		user: userObj,
		loan: loanObj,
		higherPurchaseTransactions,
		totalPayment,
		remainingPayment
	}

	next()
}

module.exports = dashboard

async function getTotalTransactions(loan_id){
	let allLoanTransactions = await transactionDb.findWith({ loan_id, status: "success" })
	console.log("All", allLoanTransactions)
	return allLoanTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)
}