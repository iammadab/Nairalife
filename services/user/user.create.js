const { createValidator } = require("lazy-validator")
const userDb = require("../../data/db/user.db")

const createUserValidator = createValidator("fullname.string.lowercase, phone.number, email.string.lowercase, password.string")

async function createUser(data){
	let validationResult = createUserValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_BODY", errors: validationResult.errors }

	let userData = validationResult.data
	// Make sure user does not exist

	let userObj = await userDb.createUser(userData)

	if(userObj)
		return { status: 200, code: "USER_CREATED", data: userObj }
}

module.exports = createUser
