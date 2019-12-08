const pageFunctions = require("./functions")

async function members(req, res, next){
	let allMembers = await pageFunctions.fetchUsers()

	req.body.pageData = {
		members: allMembers
	}

	next()
}

module.exports = members