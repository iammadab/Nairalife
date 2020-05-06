const pageFunctions = require("./functions")
const loanDb = require("../../data/db/loan.db")
const userDb = require("../../data/db/user.db")
const transactionDb = require("../../data/db/transaction.db")
const hasPendingPayment = require("../loan/functions/hasPendingPayment")

async function chargeLoans(req, res, next){
	// This service is responsible for showing all the loans approved
	// and determining if they should be charged or not
	let currentLoans = await loanDb.findWith({ status: "approved" }),
			size = currentLoans.length

	for(let i = 0; i < size; i++){
		let loan = currentLoans[i]

		let chargeToday = await hasPendingPayment(loan.user_id, loan.loan_id, loan.period, loan.started_at)
		let userObj = await userDb.findOneWith({ user_id: loan.user_id })
		let totalPayments = await getTotalTransactions(loan._id)

		loan._doc.chargeToday = chargeToday
		loan._doc.user = userObj
		loan._doc.totalPayment = totalPayments
		loan._doc.remainingPayment = loan.final_amount - totalPayments
	}

	req.body.pageData = {
		loans: currentLoans
	}

	next()
}

module.exports = chargeLoans

async function getTotalTransactions(loan_id){
	let allLoanTransactions = await transactionDb.findWith({ loan_id, status: "success" })
	return allLoanTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)
}