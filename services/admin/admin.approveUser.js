const { createValidator } = require("lazy-validator")

const approveUserValidator = createValidator("user_id.string")

const userDb = require("../../data/db/user.db")

async function approveUser(data){
	let validationResult = approveUserValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST", errors: validationResult.errors }

	let { user_id } = validationResult.data

	let userObj = await userDb.findOneWith({ user_id })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	userObj = await userDb.appendDoc({ _id: userObj._id }, "stage", "active")
	if(userObj)
		return { status: 200, code: "USER_APPROVED" }

	return { status: 500, code: "INTERNAL_SERVER_ERROR" }

}

module.exports = approveUser