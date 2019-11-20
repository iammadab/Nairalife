const mongoose = require("mongoose")

const otpSchema = mongoose.Schema({
	phone: { type: Number, required: true },
	code: { type: Number, required: true },
	type: { type: "String", default: "register" }
})

const otpModel = mongoose.model("Otp", otpSchema)

module.exports = otpModel