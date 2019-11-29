const notificationDb = require("../../../data/db/notification.db")

async function fetchNotifications(query = {}){
	return notificationDb.findWith(query)
}

module.exports = fetchNotifications