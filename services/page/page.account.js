const axios = require("axios")

let requestOptions = {
	headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`}
}

async function account(req, res, next){
	axios("https://api.paystack.co/bank", requestOptions)
		.then(handleSuccess)
		.then(handleFailure)

	function handleSuccess(response){
		console.log(response)
	}

	function handleFailure(response){
		console.log(response)
	}
}

module.exports = account