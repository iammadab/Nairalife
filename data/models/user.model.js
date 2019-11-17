const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
	fullname: { type: String, required: true },
	phone: { type: Number, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	stage: { type: String, default: "enter_contribution_preference", enum: ["enter_card_details", "enter_contribution_preference", "active" ]},

	nairascore: { type: Number, default: 0 },
	nairapoints: { type: Number, default: 0 },
	guarantor_code: { type: Number, required: true, unique: true },
	balance: { type: Number, default: 0 }

})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel