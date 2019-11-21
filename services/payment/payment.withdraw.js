const { createValidator } = require("lazy-validator")

const withdrawValidator = createValidator("amount.number")

async function withdraw(data){
	let validationResult = withdrawValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }
}

module.exports = withdraw