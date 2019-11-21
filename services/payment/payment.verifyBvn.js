const axios = require("axios")
const { createValidator } = require("lazy-validator")

const bvnValidator = createValidator("bvn.number")

const userDb = require("../../data/db/user.db")

const userService = require("../user")

let requestOptions = {
	headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`}
}



async function verifyBvn(data){
	let validationResult = bvnValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_CODE", errors: validationResult.errors }
	
	let userObj = await userDb.findOneWith({ _id: data.user.id })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	let bvnVerificationResult = await verifyBvnFn(data.bvn)
	if(bvnVerificationResult.status != 200)
		return bvnVerificationResult
	
	let addBankResult = await userService.addBank({ bvnResult: bvnVerificationResult, ...data })
	if(addBankResult.status != 200)
		return addBankResult

	return { status: 200, code: "BVN_VERIFIED" }
}

module.exports = verifyBvn


async function verifyBvnFn(bvn){
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