const mongoose = require("mongoose")

const transactionSchema = mongoose.Schema({
	username: { type: String, required: true },
	user_id: { type: Number, required: true },
	group_id: { type: Number },
	amount: { type: Number, required: true },
	reference: { type: String, required: true },
	type: { type: String, required: true, enum: ["withdrawal", "autosave", "contribution", "higher_purchase", "loan"] },
	status: { type: String, required: true, enum: ["success", "pending", "failed"] },
	attempts: { type: Number, default: 1 },
	data: { type: Object, default: {} },
	created_at: { type: Date, default: Date.now }
})

const transactionModel = mongoose.model("Transaction", transactionSchema)

module.exports = transactionModel