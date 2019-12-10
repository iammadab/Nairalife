const pageFunctions = require("./functions")

async function stat(req, res, next){
	let allMembers = await pageFunctions.fetchUsers()
	let activeMembers = await pageFunctions.fetchUsers({ stage: "active" })

	req.body.pageData = {
		allMembersCount: allMembers.length,
		activeMembersCount: activeMembers.length
	}

	next()
}

module.exports = stat