const mongoose = require("mongoose")

const pointSchema = mongoose.Schema({
	user_id: { type: Number, required: true },
	type: { type: String, required: true },
	comment: { type: String, required: true },
	points: { type: Number, required: true },

	admin_id: { type: Number, required: true },
	admin: { type: String, required: true }
})

const pointModel = mongoose.model("Point", pointSchema)

module.exports = pointModel