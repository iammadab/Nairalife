const express = require("express")
const loanRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")

const loanService = require("../services/loan")
const authenticationService = require("../services/authentication")

loanRouter.post("/", authenticationService.verifyToken(), bodyResponder(loanService.createLoan))

module.exports = loanRouter