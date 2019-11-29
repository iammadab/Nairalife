const pageFunctions = require("./functions")

async function userTransaction(req, res, next){
	let allTransactions = await pageFunctions.fetchTransactions({ user_id: req.body.user.user_id })

	console.log(allTransactions)

	req.body.pageData = {
		allTransactions
	}

	next()
}

module.exports = userTransaction