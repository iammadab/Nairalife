const axios = require("axios")

let requestOptions = {
	headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`}
}

async function fetchBanks(){
	return axios("https://api.paystack.co/bank", requestOptions)
			.then(handleSuccess)
			.catch(handleFailure)

	function handleSuccess(response){
		return response.data.data
	}

	function handleFailure(response){
		return []
	}
}

module.exports = fetchBanks