const axios = require("axios")

let requestOptions = {
	headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`}
}

async function account(req, res, next){
	axios("https://api.paystack.co/bank", requestOptions)
		.then(handleSuccess)
		.then(handleFailure)

	function handleSuccess(response){
		req.body.pageData = {
			banks: response.data.data
		}
		next()
	}

	function handleFailure(response){
		req.body.pageData = { banks: [] }
	}
}

module.exports = account