const pageFunctions = require("./functions")

async function dashboard(req, res, next){
	let userObj = await pageFunctions.fetchUser(req.body.user.id)
	let higherPurchaseTransactions = await pageFunctions.fetchTransactions({ user_id: userObj.user_id, type: "higher_purchase", status: "success" })
	let totalPayment = 0, remainingPayment = 0

	if(userObj)
		userObj.created_at = pageFunctions.createDate(userObj._id.getTimestamp()).getDate()

	higherPurchaseTransactions.forEach(transaction => {
		transaction._doc.created_at = pageFunctions.createDate(transaction._id.getTimestamp()).getHypenDate()
		totalPayment += Number(transaction.amount)
	})

	remainingPayment = Number(userObj.plan.total_amount) - totalPayment
	
	req.body.pageData = {
		user: userObj,
		higherPurchaseTransactions,
		totalPayment,
		remainingPayment
	}

	next()
}

module.exports = dashboard