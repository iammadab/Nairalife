const { createValidator } = require("lazy-validator")
const { hash } = require("../../lib/crypt")

const forgotPasswordValidator = createValidator("code.number, phone.number, password.string")

const userDb = require("../../data/db/user.db")
const otpDb = require("../../data/db/otp.db")

const authenticationService = require("../authentication")

async function forgotPassword(data){
	let validationResult = forgotPasswordValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_BODY", errors: validationResult.errors }

	let userObj = await userDb.findOneWith({ phone: data.phone })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	let otpVerification = await authenticationService.verifyOtp({ phone: data.phone, code: data.code })
	if(otpVerification.status != 200)
		return otpVerification

	await otpDb.deleteMany({ phone: data.phone, type: "reset" })

	let passwordHash = await hash(data.password)
	userObj = await userDb.appendDoc({ phone: data.phone }, "password", passwordHash)

	if(userObj)
		return { status: 200, code: "NEW_PASSWORD_SET" }
	return { status: 500, code: "PROBLEM_SETTING_PASSWORD" }
}

module.exports = forgotPassword