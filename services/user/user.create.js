const { createValidator } = require("lazy-validator")

const createUserValidator = createValidator("fullname.string.lowercase, phone.number, email.string.lowercase, password.string")

function createUser(data){
	let validationResult = createUserValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_BODY", errors: validationResult.errors }

	let userData = validationResult.data
}

module.exports = createUser