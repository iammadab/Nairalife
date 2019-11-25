const { createValidator } = require("lazy-validator")

const removeMemberValidator = createValidator("user_id.number, group_id.number")

const userDb = require("../../data/db/user.db")
const groupDb = require("../../data/db/group.db")

async function removeMember(data){
	let validationResult = removeMemberValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors } 

	data = validationResult.data

	let userObj = await userDb.findOneWith({ user_id: data.user_id })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	let groupObj = await groupDb.findOneWith({ group_id: data.group_id })
	if(!groupObj)
		return { status: 403, code: "GROUP_DOES_NOT_EXIST" }

	if(!userObj.group)
		return { status: 403, code: "USER_HAS_NO_GROUP" }

	if(userObj.group != data.group_id)
		return { status: 403, code: "USER_DOES_NOT_BELONG_TO_GROUP" }

	let members = groupObj.members
	members = members.map(member => {
		if(member.user_id == data.user_id && !member.removed){
			member.removed = true
			member.removed_date = new Date()
		}
		return member
	})

	groupObj = await groupDb.appendDoc({ group_id: data.group_id }, "members", members)
	if(!groupObj)
		return { status: 500, code: "PROBLEM_ADDING_USER", message: "Occured when updating the group"}

	userObj = await userDb.appendDoc({ user_id: data.user_id }, "group", "")
	if(!userObj)
		return { status: 500, code: "PROBLEM_ADDING_USER", message: "Occured when adding group to member" }

	return { status: 200, code: "REMOVED_USER_FROM_GROUP" }
}

module.exports = removeMember