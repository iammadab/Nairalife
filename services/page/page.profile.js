const pageFunctions = require("./functions")
const userDb = require("../../data/db/user.db")

async function profile(req, res, next){
	let userObj = await userDb.findOneWith({ user_id: req.params.user_id })

	req.body.pageData = {
		user: userObj
	}

	next()
}

module.exports = profile