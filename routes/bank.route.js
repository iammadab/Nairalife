const express = require("express")
const bankRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")

const paymentService = require("../services/payment")

bankRouter.post("/verify", bodyResponder(paymentService.verifyBank))

module.exports = bankRouter