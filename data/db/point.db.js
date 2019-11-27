const createDb = require("./base.db")
const pointModel = require("../models/point.model")
const pointDb = createDb(pointModel)

pointDb.createPoint = function({ user_id, type, comment, points, admin_id, admin }){
	let newPoint = new pointModel({
		user_id,
		type,
		comment,
		points,
		admin_id,
		admin
	})

	return newPoint.save()
}

module.exports = pointDb