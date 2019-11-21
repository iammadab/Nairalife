const axios = require("axios")
const { createValidator } = require("lazy-validator")

const verifyCardValidator = createValidator("reference.string")

const userDb = require("../../data/db/user.db")

const userService = require("../user")

const requestOptions = {
	headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY} `}
}


async function verifyCard(data){
	let validationResult = verifyCardValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let verificationResult = await verifyTransaction(data.reference)
	if(verificationResult.status != 200)
		return verificationResult

	let userObj = await userDb.findOneWith({ _id: data.user.id })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	let addCardResult = await userService.addCard({})
	if(addCardResult.status != 200)
		return addCardResult

	return verificationResult
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