const express = require("express")
const bankRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")

const paymentService = require("../services/payment")
const authenticationService = require("../services/authentication")

bankRouter.post("/verify", authenticationService.verifyToken(), bodyResponder(paymentService.verifyBank))

module.exports = bankRouter