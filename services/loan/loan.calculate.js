const { createValidator } = require("lazy-validator")

const loanDataValidator = createValidator("initial_amount.number, weeks.number, weeks_before_payment.number")

const getInterest = require("./loan.data")

async function calculateLoan(data){
	let validationResult = loanDataValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let { initial_amount, weeks, weeks_before_payment } = validationResult.data

	let totalWeeks = weeks + weeks_before_payment, interest = getInterest(totalWeeks)
	let final = ((interest / 100) * initial_amount) + initial_amount
	let finalAmount = twoDp(final)
	let weeklyPayments = twoDp(final / weeks)

	return { status: 200, code: "LOAN_CALCULATED", weeklyPayments, finalAmount, interest, weeks }

}

module.exports = calculateLoan

function twoDp(number){
	return Math.ceil(number * 100) / 100
}