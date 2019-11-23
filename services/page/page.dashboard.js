const pageFunctions = require("./functions")

async function dashboard(req, res, next){
	let userObj = await pageFunctions.fetchUser(req.body.user.id)
	let groupObj = await pageFunctions.fetchGroup(userObj.group)
	
	req.body.pageData = {
		user: userObj,
		group: groupObj
	}

	next()
}

module.exports = dashboard