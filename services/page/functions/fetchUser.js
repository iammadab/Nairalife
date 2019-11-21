const userDB = require("../../../data/db/user.db")

async function fetchUser(id){
	return await userDb.findOneWith({ _id: id })
}

module.exports = fetchUser