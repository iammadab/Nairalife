const { createValidator } = require("lazy-validator")

const transactionDeclineValidator = createValidator("transaction_id")

const userDb = require("../../data/db/user.db")
const changeStatus = require("./transaction.changeStatus")

async function declineTransaction(data){
	let validationResult = transactionDeclineValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let { transaction_id } = validationResult.data

	let userObj = await userDb.findOneWith({ _id: data.user.id })
	//The users allowed to initiate this are either admin users or users who own the transaction
	// So we first check if the user is an admin
	// Based on that information, we generate extra info  to append to the the change result call
	let isAdmin = userObj.role == "admin" ? true : false

	let extraInfo = isAdmin ? {} : { owner: true, owner_id: userObj.user_id }

	let changeStatusResult = await changeStatus({
		id: transaction_id,
		status: "failed",
		...extraInfo
	})

	if(changeStatusResult.status != 200)
		return changeStatusResult

	return { status: 200, code: "TRANSACTION_DECLINED" }
}

module.exports = declineTransaction