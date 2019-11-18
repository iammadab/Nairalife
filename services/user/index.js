const createUser = require("./user.create")
const loginUser = require("./user.login")
const userExist = require("./user.exist")
const userPreference = require("./user.preference")
const updateProfile = require("./user.updateProfile")
const changePassword = require("./user.changePassword")

let userService = {
	createUser,
	loginUser,
	userExist,
	userPreference,
	updateProfile,
	changePassword
}

module.exports = userService