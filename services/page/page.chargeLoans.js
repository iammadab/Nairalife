const pageFunctions = require("./functions")
const loanDb = require("../../data/db/loan.db")

async function chargeLoans(req, res, next){
	// This service is responsible to showing all the loans approved loans
	// and determining if they should be charged or not

	let allApprovedLoans = await loanDb.findWith({ status: "approved" })
	console.log(allApprovedLoans)
}

module.exports = chargeLoans