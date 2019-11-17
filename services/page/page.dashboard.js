const userDb = require("../../data/db/user.db")

async function dashboard(req, res, next){
	console.log(req)
	
	let userObj = await userDb.findOneWith({ phone: req.user })
	if(userObj)
		req.pageData.user = userObj
	next()
}

module.exports = dashboard