const transactionDb = require("../../../data/db/transaction.db")

async function fetchTransactions(query = {}){
	return transactionDb.findWith(query, null, { created_at: -1 })
}

module.exports = fetchTransactions