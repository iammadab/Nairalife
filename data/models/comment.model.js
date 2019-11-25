const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
	username: { type: String, required: true },
	comment: { type: String, required: true },
	created_at: { type: Date, default: new Date() },
	user_id: { type: Number, required: true },
	group_id: { type: Number, required: true }
})

const commentModel = mongoose.model("Comment", commentSchema)

module.exports = commentModel