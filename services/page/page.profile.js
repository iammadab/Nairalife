const pageFunctions = require("./functions")
const userDb = require("../../data/db/user.db")

async function profile(req, res, next){
	let userObj = await userDb.findOneWith({ user_id: req.params.user_id })
	console.log(userObj)
}

module.exports = profile