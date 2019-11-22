const pageFunctions = require("./functions")

async function groups(req, res, next){
	let groups = await pageFunctions.fetchGroups()
	console.log(groups)

	req.body.pageData = {
		groups
	}

	next()
}

module.exports = groups