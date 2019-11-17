const createUser = require("./user.create")
const loginUser = require("./user.login")
const userExist = require("./user.exist")
const userPreference = require("./user.preference")

let userService = {
	createUser,
	loginUser,
	userExist,
	userPreference
}

module.exports = userService