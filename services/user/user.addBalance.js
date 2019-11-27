const { createValidator } = require("lazy-validator")

const addBalanceValidator = createValidator("user_id.number, amount.number")

const userDb = require("../../data/db/user.db")

async function addBalance(data){
	let validationResult = addBalanceValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let validData = validationResult.data

	let userObj = await userDb.findOneWith({ user_id: validData.user_id })
	if(!userObj)
		return { status: 403, code: "USER_NOT_FOUND" }

	let { nairalife_balance, balance } = userObj
	console.log(nairalife_balance, balance)

}

module.exports = addBalance