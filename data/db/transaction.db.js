const createDb = require("./base.db")
const transactionModel = require("../models/transaction.model")
const transactionDb = createDb(transactionModel)

transactionDb.createTransaction = function({ username, user_id, amount, reference, type, status, data, group_id }){
	let newTransaction = new transactionModel({
		username,
		user_id,
		amount,
		reference,
		type,
		status,
		data,
		group_id,
		created_at: new Date()
	})

	return newTransaction.save()
} 

module.exports = transactionDb