const pageFunctions = require("./functions")

async function transaction(req, res, next){
	let transactionObj = (await pageFunctions.fetchTransaction({ _id: req.params.transaction_id }))[0]
	console.log(transactionObj)

	if(!transactionObj)
		return res.redirect("/history")

	req.body.pageData = {
		transaction: transactionObj
	}

	next()
}

module.exports = transaction