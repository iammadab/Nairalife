const { createValidator } = require("lazy-validator")

const removeMemberValidator = createValidator("user_id.number, group_id.number")

const userDb = require("../../data/db/user.db")
const groupDb = require("../../data/db/group.db")

async function removeMember(data){
	let validationResult = removeMemberValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors } 

	data = validationResult.data


}

module.exports = removeMember