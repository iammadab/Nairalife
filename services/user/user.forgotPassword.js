const { createValidator } = require("lazy-validator")

const forgotPasswordValidator = createValidator("code.number, phone.number, password.string")

const userDb = require("../../data/db/user.db")
const otpDb = require("../../data/db/otp.db")

async function forgotPassword(data){
	let validationResult = forgotPasswordValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_BODY", errors: validationResult.errors }

	let userObj = await userDb.findOneWith({ phone: data.phone })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }
}

module.exports = forgotPassword