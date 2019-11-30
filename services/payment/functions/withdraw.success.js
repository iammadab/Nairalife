const transactionDb = require("../../../data/db/transaction.db")

async function withdraw_success(data){
	// First we get the transaction object
	let transactionObj = await transactionDb.findOneWith({ reference: data.reference })
	if(!transactionObj)
		return console.log("Couldn't find the transaction obj for ", data.reference)

	// Set the status of the transaction to failed
	transactionObj = await transactionDb.appendDoc({ reference: data.reference }, "status", "success")
}

module.exports = withdraw_success