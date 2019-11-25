const mongoose = require("mongoose")

const transactionSchema = mongoose.Schema({
	username: { type: String, required: true },
	user_id: { type: Number, required: true },
	amount: { type: Number, required: true },
	reference: { type: String, required: true },
	type: { type: String, required: true, enum: ["withdrawal", "autosave", "contribution", "unknowtype"]}
	status: { type: String, required: true, enum: ["success", "pending", "failed"] },
	attempts: { type: Number, default: 1 },
	data: { type: Object, default: {} }
})

const transactionModel = mongoose.model("Transaction", transactionSchema)

module.exports = transactionModel