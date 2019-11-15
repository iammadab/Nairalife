const { createValidator } = require("lazy-validator")
const { hash } = require("../../lib/crypt")
const userDb = require("../../data/db/user.db")

console.log(hash("wisdom"))

const createUserValidator = createValidator("fullname.string.lowercase, phone.number, email.string.lowercase, password.string")

async function createUser(data){
	let validationResult = createUserValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_BODY", errors: validationResult.errors }

	let userData = validationResult.data
	console.log(userData)
	
	let usersWithPhone = await userDb.findWith({ phone: userData.phone })
	if(usersWithPhone.length > 0)
		return { status: 403, code: "PHONE_EXISTS", message: "User with phone exists" }

	let usersWithEmail = await userDb.findWith({ email: userData.email })
	if(usersWithEmail.length > 0)
		return { status: 403, code: "EMAIL_EXISTS", message: "User with email exists" }

	let userObj = await userDb.createUser(userData)

	if(userObj)
		return { status: 200, code: "USER_CREATED", data: userObj }
}

module.exports = createUser
