const pageFunctions = require("./functions")
const loanDb = require("../../data/db/loan.db")

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
	loanObj._doc.weekly_payment = loanObj.final_amount / loanObj.weeks
	
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