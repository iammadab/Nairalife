const loginAdmin = require("./admin.login")
const approveUser = require("./admin.approveUser")
const chargeLoan = require("./admin.loanCharge")

const adminServices = {
	loginAdmin,
	approveUser,
	chargeLoan
}

module.exports = adminServices