const { createValidator } = require("lazy-validator")

const withdrawValidator = createValidator("amount.number")

async function withdraw(data){
	let validationResult = withdrawValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	if(data.amount < 0)
		return { status: 403, code: "NEGATIVE_AMOUNT" }
}

module.exports = withdraw