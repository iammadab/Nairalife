const express = require("express")
const bvnRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")

const paymentService = require("../services/payment")
const authenticationService = require("../services/authentication")

bvnRouter.post("/verify", authenticationService.verifyToken(), bodyResponder(paymentService.verifyBvn))

module.exports = bvnRouter