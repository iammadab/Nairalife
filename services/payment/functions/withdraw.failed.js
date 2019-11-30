const transactionDb = require("../../../data/db/transaction.db")

async function withdraw_failed(data){
	console.log("Withdraw failure")
	console.log(data)
}

module.exports = withdraw_failed