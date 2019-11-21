const { createValidator } = require("lazy-validator")

const withdrawValidator = createValidator("amount.number")

const userDb = require("../../data/db/user.db")

async function withdraw(data){
	let validationResult = withdrawValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	if(data.amount < 0)
		return { status: 403, code: "NEGATIVE_AMOUNT" }

	let userObj = await userDb.findOneWith({ _id: data.user.id })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	if(userObj.balance < data.amount)
		return { status: 403, code: "INSUFFICIENT_BALANCE" }

	if(userObj.bank.length < 1)
		return { status: 403, code: "BANK_NOT_ADDED" }

}

module.exports = withdraw