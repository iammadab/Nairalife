const pageFunctions = require("./functions")
const userDb = require("../../data/db/user.db")
const loanDb = require("../../data/db/loan.db")

async function profile(req, res, next){
	let userObj = (await userDb.findOneWith({ user_id: req.params.user_id }))._doc
	let higherPurchaseTransactions = await pageFunctions.fetchTransactions({ user_id: userObj.user_id, type: "higher_purchase" }, 10)
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
	if(loanObj)
		loanObj._doc.weekly_payment = loanObj.final_amount / loanObj.weeks

	let allLoans = await loanDb.findWith({ user_id: userObj.user_id }, null, null, 10)
	allLoans.forEach(loan => {
		loan._doc.created_at = pageFunctions.createDate(loan.created_at).getHypenDate()
	})
	
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