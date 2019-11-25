const createDb = require("./base.db")
const transactionModel = require("../models/transaction.model")
const transactionDb = createDb(transactionModel)

module.exports = transactionDb