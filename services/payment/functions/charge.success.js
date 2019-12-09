const transactionDb = require("../../../data/db/transaction.db")
const userDb = require("../../../data/db/user.db")
const verifyCard = require("../payment.verifyCard")

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

	// The job of the next couple of lines, is to first prevent the webhook from
	// Creating multiple transactions, because the webhooks come repeatedly
	let transactionObj = await transactionDb.findOneWith({ reference: data.reference })
	if(transactionObj && transactionObj.status == "success")
		return console.log("Transaction has already been recorded")

	// Next if, the transaction has not been successfull, but somehow the webhook finds it successful
	// We update that info to reflect transaction success
	if(transactionObj && transactionObj.status != "success" && data.status == "success"){
		transactionObj = await transactionDb.appendDoc({ reference: data.reference }, "status", "success")
		return console.log("Updated the transaction to success")
	}

	// Ideally, we should never get here
	// This is where I complain
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

	let cardVerificationData = { reference: data.reference, user: { id: userObj._id } }

	let cardVerificationResult = await verifyCard(cardVerificationData)
	if(cardVerificationResult.status != 200)
		return console.log("Failed to verify card")

	console.log("Verified the card successfully")
}