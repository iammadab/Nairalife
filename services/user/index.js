const createUser = require("./user.create")
const loginUser = require("./user.login")
const userExist = require("./user.exist")

let userService = {
	createUser,
	loginUser,
	userExist
}

module.exports = userService