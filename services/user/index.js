const createUser = require("./user.create")
const loginUser = require("./user.login")
const userExist = require("./user.exist")
const userPreference = require("./user.preference")
const updateProfile = require("./user.updateProfile")
const changePassword = require("./user.changePassword")
const forgotPassword = require("./user.forgotPassword")
const addBank = require("./user.addBank")
const addCard = require("./user.addCard")
const save = require("./user.save")
const userPlan = require("./user.plan")
const addHouse = require("./user.addHouse")
const addGuarantor = require("./user.addGuarantor")
const selectCar = require("./user.selectCar")

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
	save,
	userPlan,
	addHouse,
	addGuarantor,
	selectCar
}

module.exports = userService