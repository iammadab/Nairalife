const express = require("express")
const transactionRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")

const authenticationService = require("../services/authentication")
const transactionService = require("../services/transaction")

transactionRouter.post(
	"/approve", 
	authenticationService.verifyToken("atoken"), 
	authenticationService.validateAdmin, 
	bodyResponder(transactionService.approve)
)
transactionRouter.post("/decline", bodyResponder(transactionService.decline))

module.exports = transactionRouter