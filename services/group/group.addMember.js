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

	let groupMembers = groupObj.members
	groupMembers.push({
		user_id: data.user_id,
		fullname: userObj.fullname,
		join_date: new Date()
	})

	console.log(groupMembers)

	console.log(memberData)
}

module.exports = addMember