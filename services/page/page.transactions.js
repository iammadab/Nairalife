const pageFunctions = require("./functions")

async function transactions(req, res, next){
	let allTransactions = await pageFunctions.fetchTransactions()

	allTransactions.forEach(transaction => {
		transaction._doc.created_at = pageFunctions.createDate(transaction._id.getTimestamp()).getHypenDate()
	})

	req.body.pageData = {
		transactions: allTransactions
	}

	next()
}

module.exports = transactions