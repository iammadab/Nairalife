const createDb = require("./base.db")
const notificationModel = require("../models/notification.model")
const notificationDb = createDb(notificationModel)

const userDb = require("./user.db")

notificationDb.createNotification = async function({ user_id, notification }){
	let newNotification = new notificationModel({
		user_id,
		notification
	})

	let userObj = await userDb.findOneWith({ user_id })
	if(userObbj){
		let oldNotificationCount = userObj.notification_count || 0
		await userDb.appendDoc({ user_id }, "notification_count", oldNotificationCount + 1)
	}

	return newNotification.save()
}

module.exports = notificationDb

notificationDb
	.createNotification({ user_id: 7441, notification: "This is a test notification" })
	.then(console.log)