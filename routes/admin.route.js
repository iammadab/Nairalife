const express = require("express")
const adminRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")

const adminService = require("../services/admin")
const paymentService = require("../services/payment")
const authenticationService = require("../services/authentication")

adminRouter.post("/login", bodyResponder(adminService.loginAdmin))

adminRouter.post( 
	"/charge/loan",
	authenticationService.verifyToken("atoken"),
	authenticationService.validateAdmin,
	bodyResponder(adminService.chargeLoan)
)

adminRouter.post(
	"/user/approve",
	authenticationService.verifyToken("atoken"), 
	authenticationService.validateAdmin,
	bodyResponder(adminService.approveUser)
)

adminRouter.post(
	"/charge", 
	authenticationService.verifyToken("atoken"),
	authenticationService.validateAdmin,
	bodyResponder(paymentService.charge)
)

module.exports = adminRouter