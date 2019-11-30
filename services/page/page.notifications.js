const pageFunctions = require("./functions")
const userDb = require("../../data/db/user.db")

async function notifications(req, res, next){
	let userNotifications = await pageFunctions.fetchNotifications({ user_id: req.body.user.user_id })

	// Reset the user notification count to 0
	await userDb.appendDoc({ user_id: req.body.user.user_id }, "notification_count", 0)

	userNotifications.forEach(notification => {
		let notificationDate = pageFunctions.createDate(notification.created_at)
		notification._doc.created_at = [notificationDate.getDate(), notificationDate.getTime()]
	})

	req.body.pageData = {
		userNotifications
	}

	next()
}

module.exports = notifications