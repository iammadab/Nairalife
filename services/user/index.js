const createUser = require("./user.create")
const loginUser = require("./user.login")
const userExist = require("./user.exist")
const userPreference = require("./user.preference")
const updateProfile = require("./user.updateProfile")
const changePassword = require("./user.changePassword")
const forgotPassword = require("./user.forgotPassword")
const addBank = require("./user.addBank")
const addCard = require("./user.addCard")
const addPoints = require("./user.addPoints")
const addBalance = require("./user.addBalance")
const startAutosave = require("./user.startAutosave")
const save = require("./user.save")
const upload = require("./user.upload")

let userService = {
	createUser,
	loginUser,
	userExist,
	userPreference,
	updateProfile,
	changePassword,
	forgotPassword,
	addBank,
	addCard,
	addPoints,
	addBalance,
	startAutosave,
	save,
	upload
}

module.exports = userService