const pageFunctions = require("./functions")
const userDb = require("../../data/db/user.db")

async function dashboard(req, res, next){
	let userObj = await pageFunctions.fetchUser(req.body.user.id)
	let higherPurchaseTransactions = await pageFunctions.fetchTransactions({ user_id: userObj.user_id, type: "higher_purchase" })

	higherPurchaseTransactions.forEach(transaction => {
		transaction._doc.created_at = pageFunctions.createDate(transaction._id.getTimestamp()).getHypenDate()
	})
	
	req.body.pageData = {
		user: userObj,
		higherPurchaseTransactions
	}

	next()
}

module.exports = dashboard