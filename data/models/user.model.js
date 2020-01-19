const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
	fullname: { type: String, required: true },
	phone: { type: Number, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	stage: { type: String, default: "enter_account_details", enum: ["enter_account_details", "enter_info", "choose_plan", "plan_approval", "start_plan", "active" ]},
	status: { type: String, enum: ["payment_one", "payment_two"] },
	 // Format: bank: [{ account: {account_number, account_name, bank_id, bank_code}]
	bank: { type: Array, default: [] },
	//Format card: [{ reference, 
	//                authorization: authorization_code, bank, bin, brand, card_type, channel, country_code, ex_month, exp_year, last4, reuseable, signature }]
	card: { type: Array, default: [] },
	user_id: { type: Number, required: true, unique: true },
	role: { type: String, default: "user", enum: ["user", "admin"] },

	plan: { type: Object, default: {} },
	payment_one: { type: Object, default: {} }

	// Not listed
	// plan : { total_amount, period, amount }
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel