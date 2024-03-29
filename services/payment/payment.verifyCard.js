const axios = require("axios")
const { createValidator } = require("lazy-validator")

const verifyCardValidator = createValidator("reference.string")

const userDb = require("../../data/db/user.db")

const userService = require("../user")

const requestOptions = {
	headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY} `}
}


async function verifyCard(data){
	console.log("Trying to verify card")
	let validationResult = verifyCardValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	console.log("The reference gotten is ", data.reference)
	let verificationResult = await verifyTransaction(data.reference)
	console.log("Verifying transactions", verificationResult)
	if(verificationResult.status != 200)
		return verificationResult

	let userObj = await userDb.findOneWith({ _id: data.user.id })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	let addCardResult = await userService.addCard({ authorization: verificationResult.authorization, ...data })
	if(addCardResult.status != 200)
		return addCardResult

	userObj = await userDb.appendDoc({ _id: data.user.id }, "stage", "active")
	if(userObj)
		return { status: 200, code: "CARD_VERIFIED_AND_ADDED" }

	return { status: 500, code: "PROBLEM_ADDING_CARD" }
}



function verifyTransaction(reference){
	return axios(`https://api.paystack.co/transaction/verify/${reference}`, requestOptions)
			.then(handleSuccess)
			.catch(handleFailure)

	function handleSuccess(response){
		let authorization = response.data.data.authorization
		if(authorization.reusable)
			return { status: 200, code: "VERIFIED_CARD", authorization }
		return { status: 403, code: "CARD_CANNOT_BE_REUSED" }
	}

	function handleFailure(response){
		return { status: response.response.status, code: "CARD_VERIFICATION_FAILED", messagge: response.response.data.message }
	}
}

module.exports = verifyCard