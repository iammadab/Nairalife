const pageFunctions = require("./functions")

async function transaction(req, res, next){
	let transactionObj = (await pageFunctions.fetchTransactions({ _id: req.params.transaction_id }))[0]
	let userObj = await pageFunctions.fetchUser(req.body.user.id)

	if(userObj.role != "admin" && userObj.user_id != transactionObj.user_id)
		return res.redirect("/history")

	if(!transactionObj)
		return res.redirect("/history")

	let transactionOwner = (await pageFunctions.fetchUsers({ user_id: transactionObj.user_id }))[0]

	transactionObj._doc.created_at = pageFunctions.createDate(transactionObj._id.getTimestamp()).getHypenDate()

	req.body.pageData = {
		transaction: transactionObj,
		transactionOwner
	}

	next()
}

module.exports = transaction