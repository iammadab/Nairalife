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

	if(!hasAll(userObj.fullname, bvnVerificationResult.data.first_name, bvnVerificationResult.data.last_name))
		return { status: 403, code: "BVN_VERIFICATION_FAILED", message: "Name mismatch" }
	
	let addBankResult = await userService.addBank({ bvnResult: bvnVerificationResult.data, ...data })
	if(addBankResult.status != 200)
		return addBankResult

	// Ideally, the change state route should be connected to the veify bank and bvn, not just one
	userObj = await userDb.appendDoc({ _id: data.user.id }, "stage", "enter_contribution_preference")
	if(userObj)
		return { status: 200, code: "BVN_VERIFIED_AND_ADDED" }

	return { status: 500, code: "PROBLEM_ADDING_BVN" }
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

function hasAll(container, ...pieces){
	let result = true
	pieces.forEach(piece => {
		if(container.toLowerCase().indexOf(piece.toLowerCase()) == -1)
			result = false
	})
	return result
}
