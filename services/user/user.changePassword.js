const { createValidator } = require("lazy-validator")

const changePasswordValidator = createValidator("oldPassword.string, newPassword.string")

async function changePassword(data){
	let validationResult = changePasswordValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }
}

module.exports = changePassword