const mongoose = require("mongoose")

// removed: "enter_account_details",
const userSchema = mongoose.Schema({
	fullname: { type: String, required: true },
	phone: { type: Number, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	stage: { type: String, default: "enter_info", enum: ["enter_info", "enter_business", "choose_plan", "plan_approval", "start_plan", "active", "add_house", "add_guarantor", "add_proof", "change_card"]},
	loan_stage: { type: String, default: "bvn", enum: ["bvn", "residence", "request"] },
	status: { type: String, enum: ["payment_one", "payment_two"] },
	about: { type: Object, default: {}	},
	business: { type: Object, default: {} },

	 // Format: bank: [{ account: {account_number, account_name, bank_id, bank_code}]
	bank: { type: Array, default: [] },
	//Format card: [{ reference, 
	//                authorization: authorization_code, bank, bin, brand, card_type, channel, country_code, ex_month, exp_year, last4, reuseable, signature }]
	card: { type: Array, default: [] },
	user_id: { type: Number, required: true, unique: true },
	role: { type: String, default: "user", enum: ["user", "admin"] },

	plan: { type: Object, default: {} },
	payment_one: { type: Object, default: {} },

	home_info: { type: Object, default: {} },
	guarantor: { type: Object, default: {} },

	car: { type: Object, default: {} },
	// Not listed
	// plan : { total_amount, period, amount }
	last_ip: { type: String, default: "" },
	ips: { type: Array, default: [] }
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel


/*
	house_info: {
		address: String,
		landmark: String
	}

	guarantor: {
		fullname: String,
		phone: Number,
		house_address: String,
		type_of_employer: String,
		place_of_work: String,
		description_of_work: String,
		relationship: String
	}
*/