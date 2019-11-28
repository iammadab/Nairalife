const pageFunctions = require("./functions")

async function group(req, res, next){
	let group_id = req.params.group_id,
		groupObj = await pageFunctions.fetchGroup(group_id),
		contributions = await pageFunctions.fetchContributions(group_id)

	groupObj.created_on = pageFunctions.createDate(groupObj._id.getTimestamp()).getDate()
	groupObj._doc.cycle_started = groupObj._doc.cycle_started ? groupObj._doc.cycle_started : "---"
	groupObj._doc.cycle_ended = groupObj._doc.cycle_ended ? groupObj._doc.cycle_ended : "---"

	if(!groupObj)
		return res.redirect("/admin/groups")

	req.body.pageData = {
		group: groupObj,
		contributions
	}
	
	next()
}

module.exports = group