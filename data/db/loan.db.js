const createDb = require("./base.db")
const loanModel = require("../models/loan.model")
const loanDb = createDb(loanModel)

loanDb.createLoan = async function({ user_id, interest, initial_amount, final_amount, reason, weeks, weeks_before_payment }){
	let reference = await loanModel.getReference()
	console.log("The reference ", reference)
	let newLoan = new loanModel({
		user_id,
		reference,
		interest,
		initial_amount,
		final_amount,
		reason,
		weeks,
		weeks_before_payment
	})

	return newLoan.save()
}

module.exports = loanDb