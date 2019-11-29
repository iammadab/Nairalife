const pageFunctions = require("./functions")

async function notifications(req, res, next){
	let userNotifications = await pageFunctions.fetchNotifications({ user_id: req.body.user.user_id })

	console.log(userNotifications)

	req.body.pageData = {
		userNotifications
	}

	next()
}

module.exports = notifications