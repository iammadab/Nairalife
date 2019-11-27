const pageFunctions = require("./functions")

async function fees(req, res, next){
	let userObj = await pageFunctions.fetchUser(req.body.user.id)

	req.body.pageData = {
		user: userObj
	}

	next()
}

module.exports = fees