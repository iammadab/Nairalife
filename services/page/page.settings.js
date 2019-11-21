const pageFunctions = require("./functions")

async function settings(req, res, next){
	let userObj = await pageFunctions.fetchUser(req.body.user.id)
	req.body.pageData = {
		user: userObj
	}
	next()
}

module.exports = settings