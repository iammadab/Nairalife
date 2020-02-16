const { createValidator } = require("lazy-validator")

const transactionApproveValidator = createValidator("transaction_id")

async function approveTransaction(data){
	let validationResult = transactionApproveValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }
}

module.exports = approveTransaction