const { createValidator } = require("lazy-validator")

const loanDeclineValidator = createValidator("loan_id.string")

const loanDb = require("../../data/db/loan.db")
const userDb = require("../../data/db/user.db")

async function declineLoan(data){
	let validationResult = loanDeclineValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let { loan_id } = validationResult.data

	let userObj = await userDb.findOneWith({ _id: data.user.id })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	let loanObj
	try{
		loanObj = await loanDb.findOneWith({ _id: loan_id })
	} catch(e){
		return { status: 403, code: "INVALID_LOAN_ID" }
	}

	if(loanObj.user_id != userObj.user_id)
		return { status: 403, code: "LOAN_NOT_FOUND" }

	loanObj = await loanDb.appendDoc({ _id: loanObj._id }, "status", "declined")
}

module.exports = declineLoan