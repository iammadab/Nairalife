const { createValidator } = require("lazy-validator")

const createUserValidator = createValidator("fullname.string.lowercase, phone.number, email.string.lowercase, password.string")

function createUser(data){
	let validData = createUserValidator.parse(data)
	if(validData.error)
		return { status: 400, code: "BAD_REQUEST_BODY", errors: validData.errors }
}

module.exports = createUser