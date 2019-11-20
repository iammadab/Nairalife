const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
	fullname: { type: String, required: true },
	phone: { type: Number, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	stage: { type: String, default: "enter_card_details", enum: ["enter_card_details", "enter_contribution_preference", "active" ]},

	 // Format: bank: { account: {account_number, account_name, bank_id}, 
	 				// bvn: {first_name, last_name, dob, formatted_dob, mobile, bvn } } 
	bank: { type: Array, default: [] },
	card: { type: Array, default: [] },

	user_id: { type: Number, required: true, unique: true },
	nairascore: { type: Number, default: 0 },
	nairapoints: { type: Number, default: 0 },
	balance: { type: Number, default: 0 }
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel