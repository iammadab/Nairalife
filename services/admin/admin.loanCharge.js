const { createValidator } = require("lazy-validator")

const loanChargeValidator = createValidator("user_id.string, loan_id.string")

async function loanCharge(data){
	let validationResult = loanChargeValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }
}

module.exports = loanCharge