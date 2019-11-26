const { createValidator } = require("lazy-validator")

const chargeValidator = createValidator("user_id.number, amount.number")

const userDb = require("../../data/db/user.db")

async function charge(data){
	let validationResult = chargeValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let validData = validationResult.data

	let userObj = await userDb.findOneWith({ user_id: validData.user_id })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	if(validData.amount < 1000)
		return { status: 403, code: "MINIMUM_CHARGE_1000" }

}

module.exports = charge


async function chargeUser(){

}