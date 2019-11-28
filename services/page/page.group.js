const pageFunctions = require("./functions")

async function group(req, res, next){
	let group_id = req.params.group_id,
		groupObj = await pageFunctions.fetchGroup(group_id),
		contributions = await pageFunctions.fetchContributions(group_id)

	if(!groupObj)
		return res.redirect("/admin/groups")

	groupObj.created_on = pageFunctions.createDate(groupObj._id.getTimestamp()).getDate()

	if(groupObj.cycle_started)
		groupObj.cycle_started = pageFunctions.createDate(groupObj.cycle_started).getDate()
	else
		groupObj._doc.cycle_started = "---"


	if(groupObj.cycle_ended)
		groupObj.cycle_ended = pageFunctions.createDate(groupObj.cycle_ended).getDate()
	else
		groupObj._doc.cycle_ended = "---"

	if(groupObj.status != "active")
		groupObj._doc.receiving_next = "---"

	req.body.pageData = {
		group: groupObj,
		contributions
	}
	
	next()
}

module.exports = group