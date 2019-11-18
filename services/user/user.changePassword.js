const { createValidator } = require("lazy-validator")

const changePasswordValidator = createValidator("oldPassword.string, newPassword.string")

const userDb = require("../../data/db/user.db")

async function changePassword(data){
	let validationResult = changePasswordValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let userObj = await userDb.findOneWith({ _id: data.user.id })
	console.log(userObj)
}

module.exports = changePassword