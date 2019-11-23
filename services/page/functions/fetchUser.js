const userDb = require("../../../data/db/user.db")

async function fetchUser(id){
	let userObj = await userDb.findOneWith({ _id: id })
	return userObj._doc
}

module.exports = fetchUser