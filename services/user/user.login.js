const { createValidator } = require("lazy-validator")
const jwt = require("jsonwebtoken")
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

	console.log("Password", loginData.password)
	let samePassword = await compare(loginData.password, userObj.password)
	if(!samePassword)
		return { status: 403, code: "INAVLID_PASSWORD" }

	let userToken = jwt.sign({ phone: loginData.phone }, process.env.SECRET_KEY, { expiresIn: "24h" })
	
	return { status: 200, code: "USER_LOGGED_IN", token: userToken }
}

module.exports = loginUser