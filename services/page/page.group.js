const pageFunctions = require("./functions")

async function group(req, res, next){
	let group_id = req.params.group_id,
		groupObj = await pageFunctions.fetchGroup(group_id),
		contributions = await pageFunctions.fetchContributions(group_id)

	if(!groupObj)
		return res.redirect("/admin/groups")

	groupObj.created_on = pageFunctions.createDate(groupObj._id.getTimestamp()).getDate()

	// Clean up the date for when the cycle started
	if(groupObj.cycle_started)
		groupObj.cycle_started = pageFunctions.createDate(groupObj.cycle_started).getDate()
	else
		groupObj._doc.cycle_started = "---"

	// Clean up the date for when the cycle ended
	if(groupObj.cycle_ended)
		groupObj.cycle_ended = pageFunctions.createDate(groupObj.cycle_ended).getDate()
	else
		groupObj._doc.cycle_ended = "---"

	// Attach the name of the person receiving next
	if(groupObj.status != "active")
		groupObj._doc.receiving_next = "---"
	else
		groupObj._doc.receiving_next = "You should update this"

	// Get the count of members not active
	groupObj._doc.member_count = 0
	for(let i = 0; i < groupObj.members.length; i++){
		if(!groupObj.members[i].removed) 
			groupObj._doc.member_count += 1
		groupObj.members[i].join_date = pageFunctions.createDate(groupObj.members[i].join_date).getDate()
	}

	// This is the point, where all the transactions of the group will be taken
	// All successfull transactions will be added and passed to the client
	groupObj.total_contribution = 0

	req.body.pageData = {
		group: groupObj,
		contributions
	}
	
	next()
}

module.exports = group