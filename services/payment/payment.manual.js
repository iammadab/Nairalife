const { createValidator } = require("lazy-validator")

const verifyPaymentValidator = createValidator("amount.number")

async function manualPayment(data){
	const validationResult = verifyPaymentValidator(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }
}

module.exports = manualPayment