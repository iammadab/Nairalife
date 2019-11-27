const pageFunctions = require("./functions")

async function group(req, res, next){
	let group_id = req.params.group_id,
		groupObj = await pageFunctions.fetchGroup(group_id),
		contributions = await pageFunctions.fetchContributions(group_id)

	if(!groupObj)
		return res.redirect("/admin/groups")

	req.body.pageData = {
		group: groupObj,
		contributions
	}
	
	next()
}

module.exports = group