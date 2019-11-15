const { createValidator } = require("lazy-validator")

const createUserValidator = createValidator("fullname.string.lowercase, phone.number, email.string.lowercase, password.string")

function createUser(data){
	return { status: 400, code: "USER_CREATED", message: "nice" }
}

module.exports = createUser