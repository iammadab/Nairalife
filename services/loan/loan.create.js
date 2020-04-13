const { createValidator } = require("lazy-validator")

const loanValidator = createValidator("intial_amount.number, weeks.number, reason.number")

async function createLoan(data){
	let validationResult = loanValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let { initial_amount, weeks, reason } = validationResult.data
}

module.exports = createLoan