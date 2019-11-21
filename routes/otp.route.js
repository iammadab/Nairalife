const express = require("express")
const otpRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")

const authenticationService = require("../services/authentication")

otpRouter.post("/create", bodyResponder(authenticationService.createOtp))
otpRouter.post("/verify", bodyResponder(authenticationService.verifyOtp))

module.exports = otpRouter