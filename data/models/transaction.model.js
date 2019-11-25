const mongoose = require("mongoose")

const transactionSchema = mongoose.Schema({

})

const transactionModel = mongoose.model("Transaction", transactionSchema)

module.exports = transactionModel