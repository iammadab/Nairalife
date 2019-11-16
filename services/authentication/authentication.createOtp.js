const { createValidator } = require("lazy-validator")

const createOtpValidator = createValidator("phone.number")

async function createOtp(data){
	let validationResult = createOtpValidator.parse(data)
	if(validationResult.result)
		return { status: 400, code: "BAD_REQUEST_BODY", errors: validationResult.errors }
}

module.exports = createOtp