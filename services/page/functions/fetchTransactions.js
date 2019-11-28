const transactionDb = require("../../../data/db/transaction.db")

async function fetchTransactions(query = {}){
	return transactionDb.findWith(query)
}

module.exports = fetchTransactions