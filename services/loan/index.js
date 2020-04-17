const createLoan = require("./loan.create")
const calculateLoan = require("./loan.calculate")
const approveLoan = require("./loan.approve")
const declineLoan = require("./loan.decline")

const loanServices = {
	createLoan,
	calculateLoan,
	approveLoan,
	declineLoan
}

module.exports = loanServices