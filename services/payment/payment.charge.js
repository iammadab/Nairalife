const axios = require("axios")
const { createValidator } = require("lazy-validator")

const chargeValidator = createValidator("user_id.number, amount.number")

const userDb = require("../../data/db/user.db")
const transactionDb = require("../../data/db/transaction.db")

const requestOptions = {
	headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`}
}

async function charge(data){
	let validationResult = chargeValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let validData = validationResult.data

	let userObj = await userDb.findOneWith({ user_id: validData.user_id })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	if(validData.amount < 1000)
		return { status: 403, code: "MINIMUM_CHARGE_1000" }

	if(!userObj.card)
		return { status: 403, code: "NO_CARD_FOUND" }

	// Charge the user
	let chargeResult = await chargeUser({
		authorization_code: userObj.card[0].authorization.authorization_code,
		amount: validData.amount,
		email: userObj.email
		// email: "customer@email.com"
	})
	if(chargeResult.status != 200)
		return chargeResult

	// The creation of the transaction should happen outside this service
	// This service should be used as the payment structure
	return chargeResult

}

module.exports = charge


async function chargeUser({ authorization_code, email, amount }){
	let data = {
		authorization_code,
		email,
		amount
	}

	console.log(data)

	return axios.post("https://api.paystack.co/transaction/charge_authorization", data, requestOptions)
				.then(handleSuccess)
				.catch(handleFailure)

	function handleSuccess(response){
		console.log(response)
		if(response.data.status)
			return { status: 200, code: "CHARGE_ATTEMPTED", data: response.data.data }
		return { status: 500, code: "CHARGE_FAILED", data: response.data.data }
	}

	function handleFailure(response){
		console.log(response)
		return { status: response.response.status, code: "CHARGE_FAILED", data: response.response.data }
	}
}