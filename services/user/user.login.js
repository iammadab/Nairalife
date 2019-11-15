const { createValidator } = require("lazy-validator")
const { compare } = require("../../lib/crypt")
const userDb = require("../../data/db/user.db")

const loginUserValidator = createValidator("phone.number, password.string")

async function loginUser(data){
	let validationResult = loginUserValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_BODY", errors: validationResult.errors }

	let loginData = validationResult.data

	let userObj = await userDb.findOneWith({ phone: loginData.phone })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	let samePassword = await compare(loginData.password, userObj.password)
	console.log(samePassword)

}

module.exports = loginUser