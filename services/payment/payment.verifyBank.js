const axios = require("axios")
const { createValidator } = require("lazy-validator")

const verifyBankValidator = createValidator("account_number.string, bank_code.string, bvn.string")

const userDb = require("../../data/db/user.db")

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

	let userObj = await userDb.findOneWith({ _id: data.user.id })
	console.log(userObj)
	console.log(verificationResult)
	console.log(bvnVerificationResult)

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
	return axios(`https://api.paystack.co/bank/resolve_bvn/${bvn}`, requestOptions)
			.then(handleSuccess)
			.catch(handleFailure)

	function handleSuccess(response){
		if(response.data.status == true)
			return { status: 200, code: "BVN_VERIFICATION_SUCCESSFUL", data: response.data.data }
	}

	function handleFailure(response){
		return { status: response.response.status, code: "BVN_VERIFICATION_FAILED", message: response.response.data.message }
	}
}

function hasAll(container, ...pieces){
	let result = true
	pieces.forEach(piece => {
		if(container.toLowerCase().indexOf(piece.toLowerCase()) == -1)
			result = false
	})
	return result
}

module.exports = verifyBank