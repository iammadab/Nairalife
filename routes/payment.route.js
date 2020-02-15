const express = require("express")
const paymentRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")

const authenticationService = require("../services/authentication")
const paymentService = require("../services/payment")

paymentRouter.post("/manual", authenticationService.verifyToken(), bodyResponder(paymentService.manual))

module.exports = paymentRouter