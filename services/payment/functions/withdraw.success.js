const transactionDb = require("../../../data/db/transaction.db")

async function withdraw_success(data){
	console.log("Withdraw success")
	console.log(data)	

	// First we get the transaction object
	let transactionObj = await transactionDb.findOneWith({ reference: data.reference })
	if(!transactionObj)
		return console.log("Couldn't find the transaction obj for ", data.reference)
	console.log(transactionObj)

	// Set the status of the transaction to failed
	transactionObj = transactionDb.appendDoc({ reference: data.reference }, "status", "success")
	console.log(transactionObj)
}

module.exports = withdraw_success