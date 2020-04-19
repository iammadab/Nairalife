const transactionDb = require("../../../data/db/transaction.db")

async function fetchTransactions(query = {}, limit){
	return transactionDb.findWith(query, null, { created_at: -1 }, limit)
}

module.exports = fetchTransactions