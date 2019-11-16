const { createValidator } = require("lazy-validator")

const createOtpValidator = createValidator("phone.number")

async function createOtp(data){
	let validationResult = createOtpValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_BODY", errors: validationResult.errors }
}

module.exports = createOtp



function generateOtp(){
	return (Math.floor((Math.random() * 90000)) + 10000)
}