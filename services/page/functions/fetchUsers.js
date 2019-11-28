const userDb = require("../../../data/db/user.db")

async function fetchUsers(query = {}){
	return transactionDb.findWith(query)
}

module.exports = fetchUsers