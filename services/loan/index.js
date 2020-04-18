const createLoan = require("./loan.create")
const calculateLoan = require("./loan.calculate")
const approveLoan = require("./loan.approve")
const cancelLoan = require("./loan.cancel")

const loanServices = {
	createLoan,
	calculateLoan,
	approveLoan,
	cancelLoan
}

module.exports = loanServices