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


}

module.exports = removeMember