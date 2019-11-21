const pageFunctions = require("./functions")

async function settings(req, res, next){
	let userObj = await pageFunctions.fetchUser(req.body.user.id)
	let banks = await pageFunctions.fetchBanks()

	req.body.pageData = {
		user: userObj,
		banks: banks
	}
	
	next()
}

module.exports = settings