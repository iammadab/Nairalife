const pageFunctions = require("./functions")
const loanDb = require("../../data/db/loan.db")
const hasPendingPayment = require("../loan/functions/hasPendingPayment")

async function chargeLoans(req, res, next){
	// This service is responsible for showing all the loans approved
	// and determining if they should be charged or not
	let currentLoans = await loanDb.findWith({ status: "approved" }),
			size = currentLoans.length

	for(let i = 0; i < size; i++){
		let loan = currentLoans[i]

		let chargeToday = await hasPendingPayment(loan.user_id, loan.loan_id, loan.period, loan.started_at)
		loan._doc.chargeToday = chargeToday
	}

	req.body.pageData = {
		loans
	}

	next()
}

module.exports = chargeLoans