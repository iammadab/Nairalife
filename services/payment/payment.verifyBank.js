const axios = require("axios")
const { createValidator } = require("lazy-validator")

const verifyBankValidator = createValidator("account_number.string, bank_code.string, bvn.string")

let requestOptions = {
	headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`}
}

async function verifyBank(data){
	let validationResult = verifyBankValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	verifyAccountNumber(data.account_number, data.bank_code)

}

async function verifyAccountNumber(account_number, bank_code){
	return axios(`https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`)
			.then(handleResponse)

	function handleResponse(response){
		console.log(response)
	}
}
module.exports = verifyBank