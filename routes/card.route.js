const express = require("express")
const cardRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")

const paymentService = require("./services/payment")

cardRouter.get("/verify", bodyResponder(paymentService.verifyCard))

module.exports = cardRouter