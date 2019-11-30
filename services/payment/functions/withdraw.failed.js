const transactionDb = require("../../../data/db/transaction.db")
const userDb = require("../../../data/db/user.db")

async function withdraw_failed(data){
	console.log("Withdraw failure")
	console.log("----------------")
	console.log(data)

	let transactionObj = await transactionDb.findOneWith({ reference: data.reference })
	if(!transactionObj)
		return console.log("Couldn't find the transaction obj for ", data.reference)
	console.log(transactionObj)

	let userObj = await userDb.findOneWith({ user_id: transactionObj.user_id })
	if(!userObj)
		return console.log("Couldn't find the user obj for ", transactionObj.user_id)
	console.log(userObj)

	// At this point, we refund the amount we deducted from the user earlier
	let currentBalance = Number(userObj.balance), 
		newBalance = currentBalance + Number(transactionObj.amount)
	console.log(currentBalance, newBalance)
	userObj = await userDb.appendDoc({ user_id: transactionObj.user_id }, "balance", newBalance)
	if(!userObj)
		return console.log("Encountered problem when updating the user balance from " + currentBalance + " to "  + newBalance)

	// Set the status of the transaction to failed
	transactionObj = transactionDb.appendDoc({ reference: data.reference }, "status", "failed")
	console.log(transactionObj)
}

module.exports = withdraw_failed