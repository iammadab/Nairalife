const { createValidator } = require("lazy-validator")
const userDb = require("../../data/db/user.db")

const loginUserValidator = createValidator("phone.number, password.string")

async function loginUser(data){
	let validationResult = loginUserValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_BODY", errors: validationResult.errors }

	let loginData = validationResult.data

	let userObj = await userDb.findOneWith({ phone: logindata.phone })

}

module.exports = loginUser