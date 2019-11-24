const mongoose = require("mongoose")

const groupSchema = mongoose.Schema({
	group_id: { type: Number, required: true },
	group_title: { type: String, required: true },
	group_description: { type: String, required: true },
	group_goals: { type: String, required: true },
	total_members: { type: Number, required: true },
	contribution_amount: { type: Number, required: true },
	contribution_period: { type: String, required: true, enum: ["daily", "weekly", "monthly"]},

	status: { type: String, default: "inactive", enum: ["inactive", "active", "ended"] },
	total_contribution: { type: Number, default: 0 },
	default_rate: { type: Number, default: 0 },
	comments: { type: Number, default: 0 },

	members: { type: Array, default: [] },
	comments: { type: Array, default: [] },

	started_by: { type: String }
})

const groupModel = mongoose.model("Group", groupSchema)

module.exports = groupModel