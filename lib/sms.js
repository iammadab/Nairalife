const axios = require("axios")

function sendMessage({ phone, message }){
	let data = {
		to: "234" + Number(phone),
		sms: message,
		api_key: process.env.SMS_KEY
	}

	let requestOptions = {
		headers: { "Content-Type": "application/json", "Accept": "application/json" }
	}

	return axios.post("https://termii.com/api/sms/number/send", data, requestOptions)
}

module.exports = sendMessage