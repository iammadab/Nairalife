const { createValidator } = require("lazy-validator")
const sendMessage = require("../../lib/whatsapp")

const otpDb = require("../../data/db/otp.db")
const userDb = require("../../data/db/user.db")

const createOtpValidator = createValidator("phone.number")

async function createOtp(data){
	let validationResult = createOtpValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_BODY", errors: validationResult.errors }

	if(String(data.type).toLowerCase() == "reset"){
		let userObj = await userDb.findOneWith({ phone: data.phone })
		if(!userObj)
			return { status: 403, code: "USER_DOES_NOT_EXIST" }
	}

	let code = generateCode()
	console.log(code)

	sendMessage({ phone: data.phone, message: `Your Nairalife OTP is: ${code}`})
		.then(() => console.log("Sent otp"))
		.catch((err) => console.log("Failed to send otp", err))

	let otpObj = await otpDb.create({ phone: data.phone, code, type: data.type })
	if(otpObj)
		return { status: 200, code: "OTP_CREATED" }

}

module.exports = createOtp



function generateCode(){
	return (Math.floor((Math.random() * 90000)) + 10000)
}