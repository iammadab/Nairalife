const createLoan = require("./loan.create")
const calculateLoan = require("./loan.calculate")

const loanServices = {
	createLoan,
	calculateLoan
}

module.exports = loanServices