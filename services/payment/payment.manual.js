const { createValidator } = require("lazy-validator")

const verifyPaymentValidator = createValidator("amount.number")

const userDb = require("../../data/db/user.db")
const transactionDb = require("../../data/db/transaction.db")

async function manualPayment(data){
	let validationResult = verifyPaymentValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let { amount } = validationResult.data

	let userObj = await userDb.findOneWith({ _id: data.user.id })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	if(amount < 0)
		return { status: 403, code: "NEGATIVE_AMOUNT" }

	let transactionObj = await createTransaction()
}

module.exports = manualPayment

function createTransaction(amount, reference, user){
	return transactionDb.createTransaction({
		username: user.fullname,
		user_id: user.user_id,
		amount: amount,
		reference: reference,
		type: "higher_purchase",
		status: "pending",
		data: {
			type: "manual",
			method: "transfer"
		}
	})
}