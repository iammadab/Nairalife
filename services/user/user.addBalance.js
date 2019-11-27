const { createValidator } = require("lazy-validator")

const addBalanceValidator = createValidator("user_id.number, amount.number")

async function addBalance(data){
	let validationResult = addBalanceValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }
}

module.exports = addBalance