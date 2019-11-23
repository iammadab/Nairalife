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

	if(userObj.group)
		return { status: 403, code: "USER_HAS_GROUP" }

	let groupMembers = groupObj.members
	groupMembers.push({
		user_id: data.user_id,
		fullname: userObj.fullname,
		join_date: new Date(),
		removed: false
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