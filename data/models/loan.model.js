const mongoose = require("mongoose")

const loanSchema = mongoose.Schema({
	user_id: { type: Number, required: true },
	reference: { type: String, required: true },
	interest: { type: Number, required: true },
	initial_amount: { type: Number, required: true },
	final_amount: { type: Number, required: true },
	weekly_amount: { type: Number, required: true },
	reason: { type: String, required: true },
	weeks: { type: Number, required: true },
	weeks_before_payment: { type: Number, required: true },
	status: { type: String, default: "pending", enum: ["pending", "approved", "cancelled", "declined", "completed"] },
	created_at: { type: Date, default: Date.now },
	approved_at: { type: Date },
	declined_at: { type: Date },
	started_at: { type: Date }
})

const { word } = require("../../lib/random")
loanSchema.statics.getReference = async function referenceLoop(){
	let possibleReference = word(16)
	let docExist = await this.find({ reference: possibleReference })
	if(docExist.length == 0)
		return possibleReference
	else
		return referenceLoop()
}

const loanModel = mongoose.model("Loan", loanSchema)

module.exports = loanModel