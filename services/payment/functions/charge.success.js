const transactionDb = require("../../../data/db/transaction.db")
const userDb = require("../../../data/db/user.db")

async function charge_success(data){
	console.log("Charge success")
	console.log(data)

	let transactionObj = await transactionDb.findOneWith({ reference: data.reference })
	if(!transactionObj)
		return console.log("Got a membership payment success", data.reference)
	console.log(transactionObj)

	let userObj = await userDb.findOneWith({ user_id: transactionObj.user_id })
	if(!userObj)
		return console.log("Couldn't find the user obj for ", transaction.user_id)
	console.log(userObj)

	if(transactionObj.type == "autosave")
		autosaveSuccess(userObj, transctionObj)

	else if(transactionObj.type == "contribution")
		contributionSuccess(userObj, transactionObj)

}

module.exports = charge_success

async function autosaveSuccess(user, transaction){
	// When a user autosave, theyget the money they saved in their available balance
	// So we need to get the current value in their available balance
	// Then add the amount in the transaction object
	console.log("We got autosave")
	let oldBalance = Number(user.balance), newBalance = oldBalance + Number(transaction.amount)
	console.log(oldBalance, newBalance)

	let userObj = await userDb.appendDoc({ user_id: user.user_id }, "balance", newBalance)
	if(!userObj)
		console.log("Problem updating the user autosave balance from " + oldBalance + " to " + newBalance + " for " + user.user_id)

}

async function groupSuccess(user, transaction){
	// When a user contributes to a group they don't have the money on demand
	// There is just a record that they have contributed this amount
	let oldBalance = Number(user.nairalife_balance), newBalance = oldBalance + Number(transaction.amount)
	console.log(oldBalance, newBalance)

	let userObj = await userDb.appendDoc({ user_id: user.user_id }, "nairalife_balance", newBalance)
	if(!userObj)
		console.log("Problem updating the user contribution balance from " + oldBalance + "  to " + newBalance + " for " + user.user_id)
}