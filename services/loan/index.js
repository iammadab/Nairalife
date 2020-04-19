const createLoan = require("./loan.create")
const calculateLoan = require("./loan.calculate")
const updateLoan = require("./loan.update")

const loanServices = {
	createLoan,
	calculateLoan,
	updateLoan
}

module.exports = loanServices