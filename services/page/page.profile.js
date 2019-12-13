const pageFunctions = require("./functions")
const userDb = require("../../data/db/user.db")

async function profile(req, res, next){
	let userObj = (await userDb.findOneWith({ user_id: req.params.user_id }))._doc
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

	req.body.pageData = {
		user: userObj,
		higherPurchaseTransactions,
		totalPayment,
		remainingPayment
	}

	next()
}

module.exports = profile