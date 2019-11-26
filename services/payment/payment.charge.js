const { createValidator } = require("lazy-validator")

const chargeValidator = createValidator("user_id.number, amount.number")

async function charge(data){
	let validationResult = chargeValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }
}

module.exports = charge