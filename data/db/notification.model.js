const createDb = require("./base.db")
const notificationModel = require("../models/notification.model")
const notificationDb = createDb(notificationModel)

notificationDb.createNotification = function({ user_id, notification }){
	let newNotification = new notificationModel({
		user_id,
		notification
	})

	return newNotification.save()
}

module.exports = notificationDb