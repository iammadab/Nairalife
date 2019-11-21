const userDb = require("../../data/db/user.db")

async function settings(req, res, next){
	let userObj = await userDb.findOneWith({ _id: req.body.user.id })
	req.body.pageData = {
		user: userObj
	}
	next()
}

module.exports = settings