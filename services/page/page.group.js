const pageFunctions = require("./functions")
const userDb = require("../../data/db/user.db")

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
	// Update the date of each memeber
	groupObj._doc.member_count = 0
	for(let i = 0; i < groupObj.members.length; i++){
		if(!groupObj.members[i].removed) 
			groupObj._doc.member_count += 1

		// Update the join date of each member
		groupObj.members[i].join_date = pageFunctions.createDate(groupObj.members[i].join_date).getDate()
	}

	groupObj._doc.memberInfo = await membersInfo(groupObj.members)
	console.log(groupObj._doc.memberInfo)

	// This is the point, where all the transactions of the group will be taken
	// All successfull transactions will be added and passed to the client
	groupObj.total_contribution = 0








	// Update the contributions
	for(let i = 0; i < contributions.length; i++){
		let contribution = contributions[i]
		let dateObj = pageFunctions.createDate(contribution._id.getTimestamp())
		contribution._doc.created_at = dateObj.getHypenDate()
		contribution._doc.time = dateObj.getTime()
		let contribution_info = await pageFunctions.fetchContributionStatus(contribution._id)
		contribution._doc.contribution_info = contribution_info
	}

	req.body.pageData = {
		group: groupObj,
		contributions
	}
	
	next()
}

module.exports = group

async function membersInfo(members){
	let memberCount = 0, allMembers = []

	for(let i = 0; i < members.length; i++){
		if(!members.removed) memberCount++
		let memberObj = await userDb.findOneWith({ user_id: members[i].user_id })
		let augmentedMember = Object.assign(members[i], memberObj._doc)

		if(!augmentedMember.receiving_date)
			augmentedMember.receiving_date = "---"

		if(!augmentedMember.receive_status)
			augmentedMember.receive_status = "---"

		allMembers.push(augmentedMember)
	}

	return {
		memberCount,
		allMembers
	}
}