const { createValidator } = require("lazy-validator")

const adminLoginValidator = createValidator("phone.number, password.string")

async function loginAdmin(data){
	let validationResult = adminLoginValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }
}

module.exports = loginAdmin