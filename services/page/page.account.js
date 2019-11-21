const pageFunctions = require("./functions")

async function account(req, res, next){
	let banks = await pageFunctions.fetchBanks()
	req.body.pageData = {
		banks
	}
	next()
}

module.exports = account