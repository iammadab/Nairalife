const mongoose = require("mongoose")

const contributionSchema = mongoose.Schema({
	admin: { type: String, required: true },
	admin_id: { type: Number, required: true },
	group_id: { type: Number, required: true },
})

const contributionModel = mongoose.model("Contribution", contributionSchema)

module.exports = contributionModel