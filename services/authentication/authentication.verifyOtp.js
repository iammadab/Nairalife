const { createValidator } = require("lazy-validator")

const verifyOtpValidator = createValidator("phone.number, otp.number")

async function verifyOtp(data){
	let validationResult = verifyOtpValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_BODY", errors: validationResult.errors }
}

module.exports = verifyOtp