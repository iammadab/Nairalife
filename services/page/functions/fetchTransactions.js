const transactionDb = require("../../../data/db/transaction.db")

async function fetchTransactions(query = {}){
	return transactionDb.findWith(query, null, -1)
}

module.exports = fetchTransactions