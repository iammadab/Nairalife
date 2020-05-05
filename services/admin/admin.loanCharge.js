const { createValidator } = require("lazy-validator")

const loanChargeValidator = createValidator("user_id.string, loan_id.string")

const userDb = require("../../data/db/user.db")
const loanDb = require("../../data/db/loan.db")

async function loanCharge(data){
	let validationResult = loanChargeValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let { user_id, loan_id } = validationResult.validData

	let userObj = await userDb.findOneWith({ user_id })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	let loanObj = await loanDb.findOneWith({ _id: loan_id, user_id, status: "approved" })
	if(!loanObj)
		return { status: 403, code: "LOAN_NOT_FOUND" }
}

module.exports = loanCharge