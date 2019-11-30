const mongoose = require("mongoose")

const notificationSchema = mongoose.Schema({
	user_id: { type: Number, required: true },
	notification: { type: String, required: true },
	created_at: { type: Date, default: new Date() }
})

const notificationModel = mongoose.model("Notification", notificationSchema)

module.exports = notificationModel