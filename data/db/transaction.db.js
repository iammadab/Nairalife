const createDb = require("./base.db")
const transactionModel = require("../models/transaction.model")
const transactionDb = createDb(transactionModel)

transactionDb.createTransactionm = function({ username, user_id, amount, reference, type, status, data }){
	let newTransaction = new transactionModel({
		username,
		user_id,
		amount,
		reference,
		type,
		status,
		data
	})

	return newTransaction.save()
} 

module.exports = transactionDb