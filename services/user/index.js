const createUser = require("./user.create")
const loginUser = require("./user.login")
const userExist = require("./user.exist")
const userPreference = require("./user.preference")
const updateProfile = require("./user.updateProfile")

let userService = {
	createUser,
	loginUser,
	userExist,
	userPreference,
	updateProfile
}

module.exports = userService