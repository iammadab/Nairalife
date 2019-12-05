const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
	fullname: { type: String, required: true },
	phone: { type: Number, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	// stage: { type: String, default: "enter_card_details", enum: ["enter_card_details", "enter_account_details", "enter_contribution_preference", "start_autosave", "active" ]},
	stage: { type: String, default: "enter_card_details", enum: ["enter_account_details", "enter_info", "choose_plan", "start_plan", "active" ]},
	status: { type: String, enum: ["autosave", "group"] },

	 // Format: bank: [{ account: {account_number, account_name, bank_id, bank_code}, 
     //                 bvn: {first_name, last_name, dob, formatted_dob, mobile, bvn }}]
	bank: { type: Array, default: [] },
	//Format card: { reference,
	//               authorization: authorization_code, bank, bin, brand, card_type, channel, country_code, ex_month, exp_year, last4, reuseable, signature }
	card: { type: Array, default: [] },

	user_id: { type: Number, required: true, unique: true },
	nairascore: { type: Number, default: 0 },
	nairapoints: { type: Number, default: 0 },
	balance: { type: Number, default: 0 },
	nairalife_balance: { type: Number, default: 0 }, // This is the amount of money nairalife owes the user, if it is negative it means the user owes nairalife that amount

	role: { type: String, default: "user" }, // user or admin
	group: { type: String },

	autosave_start: { type: Date },
	notification_count: { type: Number, default: 0 }
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel