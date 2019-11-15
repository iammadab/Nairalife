const { createValidator } = require("lazy-validator")
const userDb = require("../../data/db/user.db")

const createUserValidator = createValidator("fullname.string.lowercase, phone.number, email.string.lowercase, password.string")

async function createUser(data){
	let validationResult = createUserValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_BODY", errors: validationResult.errors }

	let userData = validationResult.data
	let userObj = await userDb.createUser(userData)

}

module.exports = createUser
