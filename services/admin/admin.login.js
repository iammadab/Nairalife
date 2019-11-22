const { createValidator } = require("lazy-validator")

const adminLoginValidator = createValidator("phone.number, password.string")

const userDb = require("../../data/db/user.db")

async function loginAdmin(data){
	let validationResult = adminLoginValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let userObj = await userDb.findOneWith({ phone: data.phone })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }
}

module.exports = loginAdmin