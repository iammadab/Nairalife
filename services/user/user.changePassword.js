const { createValidator } = require("lazy-validator")
const { hash, compare } = require("../../lib/crypt")

const changePasswordValidator = createValidator("oldPassword.string, newPassword.string")

const userDb = require("../../data/db/user.db")

async function changePassword(data){
	let validationResult = changePasswordValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let userObj = await userDb.findOneWith({ _id: data.user.id })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	let samePassword = await compare(data.oldPassword, userObj.password)
	if(!samePassword)
		return { status: 403, code: "INVALID_PASSWORD" }

	let newPasswordHash = await hash(data.newPassword)
	
	userObj = await userDb.appendDoc({ _id: data.user.id }, "password", newPasswordHash)
	if(userObj)
		return { status: 200, code: "UPDATED_PASSWORD" }
}

module.exports = changePassword