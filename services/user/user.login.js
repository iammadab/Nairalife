const { createValidator } = require("lazy-validator")

const loginUserValidator = createValidator("phone.number, password.string")

async function loginUser(data){
	let validationResult = loginUserValidator.parse(data)
	if(validationResult)
		return { status: 400, code: "BAD_REQUEST_BODY", errors: validationResult.errors }

	let loginData = validationResult.data
}

module.exports = loginUser