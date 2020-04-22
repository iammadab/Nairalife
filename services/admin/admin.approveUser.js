const { createValidator } = require("lazy-validator")

const approveUserValidator = createValidator("user_id.string")

async function approveUser(data){
	let validationResult = approveUserValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST", errors: validatoinResult.errors }
}

module.exports = approveUser