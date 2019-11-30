const axios = require("axios")

function sendMessage({ phone, message }){
	let data = {
		action: "send-sms",
		to: "234" + phone,
		from: process.env.WHATSAPP_KEY,
		sms: message,
		route_id: 119,
		api_key: process.env.SMS_KEY
	}

	let requestOptions = {
		headers: { "Content-Type": "application/json", "Accept": "application/json" }
	}

	return axios.post("https://termii.com/sapp/sms/api", data, requestOptions)
}

module.exports = sendMessage