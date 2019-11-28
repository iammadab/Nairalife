const userDb = require("../../../data/db/user.db")

async function fetchUsers(query = {}){
	return userDb.findWith(query)
}

module.exports = fetchUsers