const pageFunctions = require("./functions")

async function userTransaction(req, res, next){
	let allTransactions = await pageFunctions.fetchTransactions({ user_id: req.body.user.user_id })

	allTransactions.forEach(transactionDoc => {
		transactionDoc._doc.created_at = pageFunctions.createDate(transactionDoc.created_at).getHypenDate()
	})

	req.body.pageData = {
		allTransactions
	}

	next()
}

module.exports = userTransaction