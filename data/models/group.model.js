const mongoose = require("mongoose")

const groupSchema = mongoose.Schema({
	group_id: { type: Number, required: true },
	group_title: { type: String, required: true },
	group_description: { type: String, required: true },
	group_goals: { type: String, required: true },
	total_members: { type: Number, required: true },
	contribution_amount: { type: Number, required: true },
	contribution_period: { type: String, required: true, enum: ["daily", "weekly", "monthly"]},

	status: { type: String, default: "active", enum: ["active", "ended"] }
})

const groupModel = mongoose.model("Group", groupSchema)

module.exports = groupModel