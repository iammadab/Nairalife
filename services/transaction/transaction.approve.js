const { createValidator } = require("lazy-validator")

const transactionApproveValidator = createValidator("transaction_id")

const changeStatus = require("./transaction.changeStatus")

async function approveTransaction(data){
	let validationResult = transactionApproveValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let { transaction_id } = validationResult.data

	let changeStatusResult = await changeStatus({
		id: transaction_id,
		status: "success"
	})

	if(changeStatusResult.status != 200)
		return changeStatusResult

	return { status: 200, code: "TRANSACTION_APPROVED" }

}

module.exports = approveTransaction