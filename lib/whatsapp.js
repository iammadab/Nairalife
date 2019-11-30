const axios = require("axios")

function sendMessage({ phone, message }){
	let data = {
		action: "send-sms",
		to: "234" + phone,
		from: process.env.WHATSAPP_KEY,
		sms: message,
		api_key: process.env.SMS_KEY
	}
	console.log(data)
	let requestOptions = {
		headers: { "Content-Type": "application/json", "Accept": "application/json" }
	}
	return axios.post("https://termii.com/sapp/sms/api", data, requestOptions)
}

sendMessage({
	phone: "9092268168",
	message: "The nothing."
}).then(console.log).catch(console.log)