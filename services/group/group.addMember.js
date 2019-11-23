const { createValidator } = require("lazy-validator")

const addMemberValidator = createValidator("group_id.number, user_id.number")

async function addMember(data){
	let validationResult = addMemberValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_CODE", errors: validationResult.errors }
}

module.exports = addMember