const createUser = require("./user.create")
const loginUser = require("./user.login")

let userService = {
	createUser,
	loginUser
}

module.exports = userService