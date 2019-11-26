const axios = require("axios")
const { createValidator } = require("lazy-validator")

const chargeValidator = createValidator("user_id.number, amount.number")

const userDb = require("../../data/db/user.db")

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

	let chargeResult = await chargeUser({
		authorization_code: userObj.card[0].authorization.authorization_code,
		amount: validData.amount,
		email: userObj.email
		// email: "customer@email.com"
	})

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
	}

	function handleFailure(response){
		console.log(response)
	}
}