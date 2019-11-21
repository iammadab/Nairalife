const axios = require("axios")
const { createValidator } = require("lazy-validator")

const verifyCardValidator = createValidator("reference.string")

const requestOptions = {
	headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY} `}
}

async function verifyCard(data){
	let validationResult = verifyCardValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	verifyTransaction(data.reference)

}

function verifyTransaction(reference){
	return axios(`https://api.paystack.co/transaction/verify/${reference}`)
			.then(handleSuccess)
			.catch(handleFailure)

	function handleSuccess(response){
		console.log(response)
	}

	function handleFailure(response){
		console.log(response)
	}
}

module.exports = verifyCard