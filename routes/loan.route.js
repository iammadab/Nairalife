const express = require("express")
const loanRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")

const loanService = require("../services/loan")
const authenticationService = require("../services/authentication")

loanRouter.post("/", authenticationService.verifyToken(), bodyResponder(loanService.createLoan))
loanRouter.post("/calculate", authenticationService.verifyToken(), bodyResponder(loanService.calculateLoan))
loanRouter.post("/cancel", authenticationService.verifyToken(), bodyResponder(loanService.cancelLoan))

module.exports = loanRouter