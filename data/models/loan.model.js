const mongoose = require("mongoose")

const loanSchema = mongoose.Schema({
	user_id: { type: Number, required: true },
	interest: { type: Number, required: true },
	initial_amount: { type: Number, required: true },
	final_amount: { type: Number, required: true },
	reason: { type: String, required: true },
	weeks: { type: Number, required: true },
	status: { type: String, default: "pending", enum: ["pending", "approved", "cancelled", "completed"] },
	created_at: { type: Date, default: new Date() },
	approved_at: { type: Date, default: new Date() },
	started_at: { type: Date, default: new Date() }
})

const loanModel = mongoose.model("Loan", loanSchema)

module.exports = loanModel