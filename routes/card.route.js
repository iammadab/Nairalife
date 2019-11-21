const express = require("express")
const cardRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")

const paymentService = require("../services/payment")

cardRouter.post("/verify", bodyResponder(paymentService.verifyCard))

module.exports = cardRouter