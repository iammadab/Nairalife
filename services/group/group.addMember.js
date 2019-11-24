const { createValidator } = require("lazy-validator")

const addMemberValidator = createValidator("group_id.number, user_id.number")

const userDb = require("../../data/db/user.db")
const groupDb = require("../../data/db/group.db")

async function addMember(data){
	let validationResult = addMemberValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_CODE", errors: validationResult.errors }

	let userObj = await userDb.findOneWith({ user_id: data.user_id })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	let groupObj = await groupDb.findOneWith({ group_id: data.group_id })
	if(!groupObj)
		return { status: 403, code: "GROUP_DOES_NOT_EXIST" }

	if(groupObj.status == "ended")
		return { status: 403, code: "GROUP_HAS_ENDED" }

	if(userObj.group)
		return { status: 403, code: "USER_HAS_GROUP" }

	let groupMembers = groupObj.members, receiving_date

	// If the group is already active, we don't order the members based on their nairascore and the day they entered nairalife
	// Instead, we just add them to the bottom of the group list
	// But we also have to give them a receiving date, so this block gets the date of the last person and then adds the group period
	// To get the next date
	if(groupObj.status == "active"){
		let lastMember = groupMembers[groupMembers.length - 1]
		console.log("Last member", lastMember)
		let lastDate = lastMember.receiving_date
		console.log("Last date", lastDate)

		let periodMap = { daily: 1,	weekly: 7, monthly: 30 }, groupPeriod = periodMap[groupObj.contribution_period]


	}










	groupMembers.push({
		user_id: data.user_id,
		fullname: userObj.fullname,
		join_date: new Date(),
		removed: false,
		receiving_date
	})

	userObj = await userDb.appendDoc({ user_id: data.user_id }, "group", data.group_id)
	if(!userObj)
		return { status: 500, code: "PROBLEM_ADDING_USER", message: "Occured when adding group to member" }

	groupObj = await groupDb.appendDoc({ group_id: data.group_id }, "members", groupMembers)
	if(!groupObj)
		return { status: 500, code: "PROBLEM_ADDING_USER", message: "Occured when adding member to group"}

	return { status: 200, code: "ADDED_USER_TO_GROUP" }
}

module.exports = addMember



function addDays(date, days) {
	const newDate = new Date(Number(date))
 	newDate.setDate(date.getDate() + days)
 	return newDate
}