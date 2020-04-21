const express = require("express")
const loanRouter = express.Router()

const { bodyResponder, reqResponder } = require("./serviceAdapter")

const loanService = require("../services/loan")
const authenticationService = require("../services/authentication")

loanRouter.post("/", authenticationService.verifyToken(), bodyResponder(loanService.createLoan))
loanRouter.post("/calculate", authenticationService.verifyToken(), bodyResponder(loanService.calculateLoan))
loanRouter.post("/cancel", authenticationService.verifyToken(), reqResponder(loanService.updateLoan("cancelled")))
loanRouter.post(
	"/approve", 
	authenticationService.verifyToken("atoken"), 	
	authenticationService.validateAdmin, 
	reqResponder(loanService.updateLoan("approved"))
)
loanRouter.post(
	"/decline", 
	authenticationService.verifyToken("atoken"), 
	authenticationService.validateAdmin, 
	reqResponder(loanService.updateLoan("declined"))
)

module.exports = loanRouter