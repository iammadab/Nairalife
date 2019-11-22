const pageFunctions = require("./functions")

async function groups(req, res, next){
	let groups = await pageFunctions.fetchGroups()

	req.body.pageData = {
		groups
	}

	next()
}

module.exports = groups