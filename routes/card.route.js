
const express = require("express")
const cardRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")

const paymentService = require("../services/payment")
const authenticationService = require("../services/authentication")

cardRouter.post("/verify", authenticationService.verifyToken, bodyResponder(paymentService.verifyCard))

module.exports = cardRouter