const { createValidator } = require("lazy-validator")

const loanValidator = createValidator("initial_amount.number, weeks.number, reason.string")

const userDb = require("../../data/db/user.db")
const loanDb = require("../../data/db/loan.db")

async function createLoan(data){
	let validationResult = loanValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let { initial_amount, weeks, reason } = validationResult.data

	let userObj = await userDb.findOneWith({ _id: data.user.id })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	if(userObj.stage != "active")
		return { status: 403, code: "INVALID_STATUS" }

	let activeLoan = await loanDb.findOneWith({ user_id: userObj.user_id, status: { $in: ["pending", "approved"] }})
	if(activeLoan)
		return { status: 403, code: "PENDING_LOAN" }

	let interest = generateInterest(weeks)
	if(!interest)
		return { status: 403, code: "INVALID_WEEKS" }

	let final_amount = ((interest / 100) * initial_amount) + initial_amount

	let loanObj = await loanDb.createLoan({
		user_id: userObj.user_id,
		interest,
		initial_amount,
		final_amount,
		weeks,
		reason
	})
	if(loanObj)
		return { status: 200, code: "LOAN_CREATED" }

	return { status: 500, code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" }
}

module.exports = createLoan


function generateInterest(weeks){
	if(weeks <= 4) return 10
	if(weeks <= 8) return 25
	if(weeks <= 12) return 35
}