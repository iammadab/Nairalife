const pageFunctions = require("./functions")

async function transactions(req, res, next){
	let allTransactions = await pageFunctions.fetchTransactions()

	req.body.pageData = {
		transactions: allTransactions
	}

	next()
}

module.exports = transactions