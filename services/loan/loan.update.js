const { createValidator } = require("lazy-validator")

const loanUpdateValidator = createValidator("loan_id.string")

const loanDb = require("../../data/db/loan.db")
const userDb = require("../../data/db/user.db")

const { addWeeks } = require("../../lib/date")

function updateLoanStatus(status){
	return async function updateLoan(data){
		let validationResult = loanUpdateValidator.parse(data)
		if(validationResult.error)
			return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

		let { loan_id } = validationResult.data, userObj

		let possibleStatus = ["pending", "approved", "cancelled", "declined", "completed"]
		if(!possibleStatus.includes(status))
			return { status: 403, code: "INVALID_STATUS", message: `Valid Status: ${possibleStatus.join(", ")}` }

		let loanObj
		try{
			loanObj = await loanDb.findOneWith({ _id: loan_id })
		} catch(e){
			return { status: 403, code: "INVALID_LOAN_ID" }
		}
		
		if(data["atoken"])
			userObj = await userDb.findOneWith({ user_id: loanObj.user_id })
		else
			userObj = await userDb.findOneWith({ _id: data.user.id })

		if(!userObj)
			return { status: 403, code: "USER_DOES_NOT_EXIST" }

		if(loanObj.user_id != userObj.user_id)
			return { status: 403, code: "LOAN_NOT_FOUND" }

		if(loanObj.status != "pending")
			return { status: 403, code: "LOAN_NOT_PENDING" }

		// Update the modified date
		let today = new Date()
		loanObj = await loanDb.appendDoc({ _id: loanObj._id }, "modified_at", today)
		// Update the loan status
		loanObj = await loanDb.appendDoc({ _id: loanObj._id }, "status", status)

		if(status == "approved"){
			let startDate = addWeeks(today, loanObj.weeks_before_payment)
			loanObj = await loanDb.appendDoc({ _id: loanObj._id }, "started_at", startDate)
		}

		if(loanObj)
			return { status: 200, code: "LOAN_STATUS_UPDATED" }

		return { status: 500, code: "INTERNAL_SERVER_ERROR" }
	}
}

module.exports = updateLoanStatus