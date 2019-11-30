const transactionDb = require("../../../data/db/transaction.db")

async function withdraw_failed(data){
	console.log("Withdraw failure")
	console.log(data)

	let transactionObj = await transactionDb.findOneWith({ reference: data.reference })
	if(!transactionObj)
		return console.log("Couldn't find the transaction obj for ", data.reference)

	// Set the status of the transaction to failed
	transactionDb.appendDoc({ reference: data.reference }, "status", "failed")
	
}

module.exports = withdraw_failed