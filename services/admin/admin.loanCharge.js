const { createValidator } = require("lazy-validator")

const loanChargeValidator = createValidator("user_id.string, loan_id.string")

const userDb = require("../../data/db/user.db")
const loanDb = require("../../data/db/loan.db")
const transactionDb = require("../../data/db/transaction.db")

async function loanCharge(data){
	let validationResult = loanChargeValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let { user_id, loan_id } = validationResult.validData

	let adminObj = await userDb.findOneWith({ _id: data.user.id })

	let userObj = await userDb.findOneWith({ user_id })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	let loanObj = await loanDb.findOneWith({ _id: loan_id, user_id, status: "approved" })
	if(!loanObj)
		return { status: 403, code: "LOAN_NOT_FOUND" }

	let chargedToday = await hasBeenChargedToday(user_id, loan_id)
	if(chargedToday)
		return { status: 403, code: "LOAN_CHARGED_TODAY" }

	// Charge the user based on the amount they should pay weekly
	let paymentAmount = loanObj.weekly_amount
	let chargeResult = await charge({
		user_id,
		amount: paymentAmount
	})

	// Create a transaction object
	let userTransaction = await transactionDb.createTransaction({
		username: userObj.fullname,
		user_id,
		loan_id,
		amount: paymentAmount,
		reference: chargeResult.data.reference,
		type: "loan",
		status: chargeResult.data.status == "failed" ? "failed" : "pending",
		data: {
			admin: adminObj ? adminObj.fullname : "Automatic",
			admin_id: adminObj ? adminObj.user_id : 0
		}
	})	

}

module.exports = loanCharge



async function hasBeenChargedToday(user_id, loan_id){
	// First I fetch all the non failed transactions for that loan today
	let midnight = new Date((new Date()).setHours(0, 0, 0, 0))
	let baseData = { user_id, type: "loan", loan_id }
	let successfulTransactions = await transactionDb.findWith({ ...baseData, status: "success", created_at: { $gte: midnight }})
	let pendingTransactions = await transactionDb.findWith({ ...baseData, status: "pending", created_at: { $gte: midnight }})

	return successfulTransactions.length > 0 || pendingTransactions.length > 0
}