const userDb = require("../../data/db/user.db")

async function validateAdmin(req, res, next){
	// There are two ways to do this, we could trust the token and use the role attribute to verify ig the user is admin
	// Or we could fetch the user and check the database to make sure the user is actual an admin
	// I will be choosing the later, as it is more secure, incase the key get's compromised
	let userObj = await userDb.findOneWith({ _id: req.body.user.id })
	// console.log(userObj)
	if(!userObj)
		return res.status(403).json({ code: "USER_DOES_NOT_EXIST", status: 403 })
	if(userObj.role != "admin")
		return res.status(403).json({ code: "UNAUTHORIZED", status: 403 })

	next()
}

module.exports = validateAdmin