const { createValidator } = require("lazy-validator")

const verifyPaymentValidator = createValidator("amount.number")

const random = require("../../lib/random")
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

	let reference = await generateReference()

	let transactionObj = await createTransaction(amount, reference, userObj)
	if(transactionObj)
		return { status: 200, code: "TRANSACTION_CREATED", redirect_url: `transaction/${transactionObj._id}` }

	return { status: 500, code: "PROBLEM_CREATING_TRANSACTION" }
}

module.exports = manualPayment

async function generateReference(){
	let randomReference = random.word(16)
	if(await isUniqueReference(randomReference))
		return randomReference
	else
		return await generateReference()
}

async function isUniqueReference(reference){
	let transactionObj = await transactionDb.findOneWith({ reference })
	return transactionObj ? false : true
}

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