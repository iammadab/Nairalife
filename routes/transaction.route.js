const express = require("express")
const transactionRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")

const transactionService = require("../services/transaction")

transactionRouter.post("/approve", bodyResponder(transactionService.approve))
transactionRouter.post("/decline", bodyResponder(transactionService.decline))

module.exports = transactionRouter