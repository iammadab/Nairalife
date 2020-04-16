const createDb = require("./base.db")
const loanModel = require("../models/loan.model")
const loanDb = createDb(loanModel)

loanDb.createLoan = async function({ user_id, interest, initial_amount, final_amount, reason, weeks }){
	let newLoan = new loanModel({
		user_id,
		interest,
		initial_amount,
		final_amount,
		reason,
		weeks
	})

	return newLoan.save()
}

module.exports = loanDb