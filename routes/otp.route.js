const express = require("express")
const otpRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")

const authenticationService = require("../services/authentication")

otpRouter.post("/create", bodyResponder(authenticationService.createOtp))

module.exports = otpRouter