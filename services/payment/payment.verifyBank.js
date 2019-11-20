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

	let verificationResult = await verifyAccountNumber(data.account_number, data.bank_code)
	if(verificationResult.status != 200)
		return verificationResult

	let bvnVerificationResult = await verifyBvn(data.bvn)
	if(bvnVerificationResult.status != 200)
		return bvnVerificationResult

}




async function verifyAccountNumber(account_number, bank_code){
	return axios(`https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`, requestOptions)
			.then(handleSuccess)
			.catch(handleFailure)

	function handleSuccess(response){
		if(response.data.status == true)
			return { status: 200, code: "ACCOUNT_VERIFICATION_SUCCESSFUL", data: response.data.data }
	}

	function handleFailure(response){
		if(response.response.data.status == false)
			return { status: response.response.status, code: "ACCOUNT_VERIFICATION_FAILED", message: response.response.data.message }
	}
}


async function verifyBvn(bvn){
	
}

module.exports = verifyBank