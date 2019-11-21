const axios = require("axios")
const { createValidator } = require("lazy-validator")

const verifyBankValidator = createValidator("account_number.string, bank_code.string")

const userDb = require("../../data/db/user.db")

const userService = require("../user")

let requestOptions = {
	headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`}
}


async function verifyBank(data){
	let validationResult = verifyBankValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let userObj = await userDb.findOneWith({ _id: data.user.id })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	let verificationResult = await verifyAccountNumber(data.account_number, data.bank_code)
	if(verificationResult.status != 200)
		return verificationResult

	let addBankResult = await userService.addBank({ accountResult: verificationResult.data, ...data })
	if(addBankResult.status != 200)
		return addBankResult
	
	return { status: 500, code: "BANK_VERIFIED_AND_ADDED" }
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

module.exports = verifyBank