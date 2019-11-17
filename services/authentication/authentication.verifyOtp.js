const { createValidator } = require("lazy-validator")
const otpDb = require("../../data/db/otp.db")

const verifyOtpValidator = createValidator("phone.number, code.number")

async function verifyOtp(data){
	let validationResult = verifyOtpValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_BODY", errors: validationResult.errors }

	let otpObj = await otpDb.findOneWith({ phone: data.phone, code: data.code })

	if(!otpObj)
		return { status: 403, code: "OTP_VERIFICATION_FAILED" }
	
	// Delete all the otps for that phone number
	await otpDb.deleteMany({ phone: data.phone })

	return { status: 200, code: "OTP_VERIFICATION_SUCCESS" }
}

module.exports = verifyOtp