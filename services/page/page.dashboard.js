const userDb = require("../../data/db/user.db")

async function dashboard(req, res, next){
	let userObj = await userDb.findOneWith({ phone: req.body.user.phone })
	req.body.pageData = { 
		user: userObj 
	}
	next()
}

module.exports = dashboard