const { createValidator } = require("lazy-validator")
const otpDb = require("../../data/db/otp.db")

const createOtpValidator = createValidator("phone.number")

async function createOtp(data){
	let validationResult = createOtpValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_BODY", errors: validationResult.errors }

	let code = generateCode()
	console.log(code)
	let otpObj = await otpDb.create({ phone: data.phone, code })

	if(otpObj)
		return { status: 200, code: "OTP_CREATED" }
}

module.exports = createOtp



function generateCode(){
	return (Math.floor((Math.random() * 90000)) + 10000)
}