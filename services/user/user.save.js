const { createValidator } = require("lazy-validator")

const saveValidator = createValidator("user_id.number")

const userDb = require("../../data/db/user.db")

async function save(data){
	let validationResult = saveValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let validData = validationResult.data

	let userObj = await userDb.findOneWith({ user_id: validData.user_id })
	if(!userObj)
		return { status: 403, code: "USER_NOT_FOUND" }
}

module.exports = save