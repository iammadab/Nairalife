const express = require("express")
const paymentRouter = express.Router()

const { bodyResponder, paramResponder } = require("./serviceAdapter")

const authenticationService = require("../services/authentication")
const paymentService = require("../services/payment")

paymentRouter.post("/manual", authenticationService.verifyToken(), bodyResponder(paymentService.manual))
paymentRouter.get("/bank/:bank_code", paramResponder(paymentService.getBank))

module.exports = paymentRouter