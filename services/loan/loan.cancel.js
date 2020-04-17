const { createValidator } = require("lazy-validator")

const loanCancelValidator = createValidator("loan_id.string")

const loanDb = require("../../data/db/loan.db")
const userDb = require("../../data/db/user.db")

async function cancelLoan(data){
	let validationResult = loanCancelValidator.parse(data)
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

	if(loanObj.status != "pending")
		return { status: 403, code: "LOAN_NOT_PENDING" }

	loanObj = await loanDb.appendDoc({ _id: loanObj._id }, "status", "cancelled")
	if(loanObj)
		return { status: 200, code: "LOAN_CANCELLED" }

	return { status: 500, code: "INTERNAL_SERVER_ERROR" }
}

module.exports = cancelLoan