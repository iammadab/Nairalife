const pageFunctions = require("./functions")
const loanDb = require("../../data/db/loan.db")
const shouldCharge = require("../loan/functions/shouldCharge")

async function chargeLoans(req, res, next){
	// This service is responsible to showing all the loans approved loans
	// and determining if they should be charged or not

	let currentLoans = await loanDb.findWith({ status: "approved" }),
			size = currentLoans.length

	for(let i = 0; i < size; i++){
		let loan = currentLoans[i]

		let chargeToday = shouldCharge(loan.period, loan.started_at)
		loan._doc.chargeToday = chargeToday
	}

	console.log(currentLoans)

	req.body.pageData = {
		loans
	}

	// next()

}

module.exports = chargeLoans

chargeLoans()