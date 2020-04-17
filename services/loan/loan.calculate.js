const { createValidator } = require("lazy-validator")

const loanDataValidator = createValidator("initial_amount.number, weeks.number, weeks_before_payment.number")

async function calculateLoan(data){
	let validationResult = loanDataValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }
}

module.exports = calculateLoan