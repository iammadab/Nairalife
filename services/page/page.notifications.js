const pageFunctions = require("./functions")

async function notifications(req, res, next){
	let userNotifications = await pageFunctions.fetchNotifications({ user_id: req.body.user.user_id })

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