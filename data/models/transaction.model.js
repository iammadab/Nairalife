const mongoose = require("mongoose")

const transactionSchema = mongoose.Schema({
	username: { type: String, required: true },
	user_id: { type: Number, required: true },
	amount: { type: Number, required: true },
	reference: { type: String, required: true },
	status: { type: String, required: true, enum: ["success", "pending", "failed"] },
	attempts: { type: Number },
	data: { type: Object, default: {} }
})

const transactionModel = mongoose.model("Transaction", transactionSchema)

module.exports = transactionModel