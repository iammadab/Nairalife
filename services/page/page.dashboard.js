const userDb = require("../../data/db/user.db")

async function dashboard(req, res, next){
	let userObj = await userDb.findOneWith({ _id: req.body.user.id })
	console.log(userObj)
	req.body.pageData = { 
		user: userObj 
	}
	next()
}

module.exports = dashboard