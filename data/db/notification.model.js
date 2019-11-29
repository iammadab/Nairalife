const createDb = require("./base.db")
const notificationModel = require("../models/notification.model")
const notificationDb = createDb(notificationModel)

module.exports = notificationDb