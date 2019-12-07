const transactionDb = require("../../../data/db/transaction.db")
const userDb = require("../../../data/db/user.db")

async function charge_success(data){
	console.log("Charge success")
	console.log(data)

	console.log(data.metadata)
	if(data.metadata.type == "PAYMENT_START")
		makeFirstPay(data)
}

module.exports = charge_success

async function makeFirstPay(data){
	let userObj = await userDb.findOneWith({ user_id: data.metadata.user_id })
	if(!userObj)
		return console.log("User not found")

	let transactionObj = await transactionDb.findOneWith({ reference: data.reference })
	if(transactionObj && transactionObj.status == "success")
		return console.log("Transaction has already been recorded")

	if(transactionObj && transactionObj.status != "success" && data.status == "success"){
		transactionObj = await transactionDb.appendDoc({ reference: data.reference }, "status", "success")
		return console.log("Updated the transaction to success")
	}

	if(transactionObj)
		return console.log("I don't know what to do with the transaction", data.reference)

	transactionObj = await transactionDb.createTransaction({
		username: userObj.fullname,
		user_id: userObj.user_id,
		amount: Number(data.amount) / 100,
		reference: data.reference,
		type: "higher_purchase",
		status: "success"
	})

	console.log(transactionObj)


}

// async function charge_success(data){
// 	console.log("Charge success")
// 	console.log(data)

// 	let transactionObj = await transactionDb.findOneWith({ reference: data.reference })
// 	if(!transactionObj)
// 		return console.log("Got a membership payment success", data.reference)
// 	console.log(transactionObj)

// 	let userObj = await userDb.findOneWith({ user_id: transactionObj.user_id })
// 	if(!userObj)
// 		return console.log("Couldn't find the user obj for ", transactionObj.user_id)
// 	console.log(userObj)


// 	if(transactionObj.status != "pending")
// 		return console.log("This transaction is not pending")


// 	if(transactionObj.type == "autosave")
// 		autosaveSuccess(userObj, transactionObj)

// 	else if(transactionObj.type == "contribution")
// 		contributionSuccess(userObj, transactionObj)

// }

// module.exports = charge_success

// async function autosaveSuccess(user, transaction){
// 	// When a user autosave, theyget the money they saved in their available balance
// 	// So we need to get the current value in their available balance
// 	// Then add the amount in the transaction object
// 	console.log("We got autosave")
// 	let oldBalance = Number(user.balance), newBalance = oldBalance + Number(transaction.amount)
// 	console.log(oldBalance, newBalance)

// 	let userObj = await userDb.appendDoc({ user_id: user.user_id }, "balance", newBalance)
// 	if(!userObj)
// 		console.log("Problem updating the user autosave balance from " + oldBalance + " to " + newBalance + " for " + user.user_id)

// 	let transactionObj = await transactionDb.appendDoc({ reference: transaction.reference }, "status", "success")
// 	if(!transactionObj)
// 		console.log("Problem updating the transaction obj to success")

// }

// async function contributionSuccess(user, transaction){
// 	// When a user contributes to a group they don't have the money on demand
// 	// There is just a record that they have contributed this amount
// 	let oldBalance = Number(user.nairalife_balance), newBalance = oldBalance + Number(transaction.amount)
// 	console.log(oldBalance, newBalance)

// 	let userObj = await userDb.appendDoc({ user_id: user.user_id }, "nairalife_balance", newBalance)
// 	if(!userObj)
// 		console.log("Problem updating the user contribution balance from " + oldBalance + "  to " + newBalance + " for " + user.user_id)

// 	let transactionObj = await transactionDb.appendDoc({ reference: transaction.reference }, "status", "success")
// 	if(!transactionObj)
// 		console.log("Problem updating the transaction obj to success")
// }