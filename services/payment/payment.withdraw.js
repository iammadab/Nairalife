const axios = require("axios")
const { createValidator } = require("lazy-validator")

const withdrawValidator = createValidator("amount.number")

const requestOptions = {
	headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`}
}

const userDb = require("../../data/db/user.db")

async function withdraw(data){
	let validationResult = withdrawValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	if(data.amount < 0)
		return { status: 403, code: "NEGATIVE_AMOUNT" }

	let userObj = await userDb.findOneWith({ _id: data.user.id })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	if(userObj.balance < data.amount)
		return { status: 403, code: "INSUFFICIENT_BALANCE" }

	if(userObj.bank.length < 1)
		return { status: 403, code: "BANK_NOT_ADDED" }

	let recieptResult = await createReceipt({
		name: userObj.fullname,
		account_number: userObj.bank[0].account.account_number,
		bank_code: userObj.bank[0].account.bank_code
	})
	if(recieptResult.status != 200)
		return recieptResult

	// console.log(recieptResult)
	let transferResult = await initiateTransfer({
		amount: data.amount,
		recipient: recieptResult.data.recipient_code
	})
	if(transferResult.status != 200)
		return transferResult

}

module.exports = withdraw





function createReceipt({ name, account_number, bank_code }){
	console.log(arguments)
	let data = {
		type: "nuban", 
		name,
		account_number,
		bank_code,
		currency: "NGN",
		description: "Nairalife withdrawal"
	}

	return axios.post("https://api.paystack.co/transferrecipient", data, requestOptions)
				.then(handleSuccess)
				.catch(handleFailure)

	function handleSuccess(response){
		if(response.data.status)
			return { status: 200, code: "CREATED_TRANSFER_RECEIPT", data: response.data.data }
		return { status: 500, code: "FAILED_TRANSFER_RECEIPT" }
	}

	function handleFailure(response){
		return { status: response.response.status, code: "FAILED_TRANSFER_RECEIPT", message: response.response.data.message }
	}
}



function initiateTransfer({ amount, recipient }){
	console.log(arguments)
	let data = {
		source: "balance",
		amount,
		currency: "NGN",
		reason: "Nairalife Withdrawal",
		recipient
	}

	return axios.post("https://api.paystack.co/transfer", data, requestOptions)
				.then(handleSuccess)
				.catch(handleFailure)

	function handleSuccess(response){
		if(response.data.status)
			return { status: 200, code: "TRANSFER_SUCCESSFUL", data: response.data.data }
		return { status: 500, code: "TRANSFER_FAILED" }
	}

	function handleFailure(response){
		console.log(response.response.data)
		return { status: 500, code: "TRANSFER_FAILED" }
	}
}