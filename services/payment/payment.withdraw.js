const axios = require("axios")
const { createValidator } = require("lazy-validator")
const { compare } = require("../../lib/crypt")

const withdrawValidator = createValidator("amount.number, password.string")

const requestOptions = {
	headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`}
}

const userDb = require("../../data/db/user.db")
const transactionDb = require("../../data/db/transaction.db")

async function withdraw(data){
	let validationResult = withdrawValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	if(data.amount < 0)
		return { status: 403, code: "NEGATIVE_AMOUNT" }

	let userObj = await userDb.findOneWith({ _id: data.user.id })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	let samePassword = await compare(data.password, userObj.password)
	if(!samePassword)
		return { status: 403, code: "INVALID_PASSWORD" }

	if(userObj.balance < data.amount)
		return { status: 403, code: "INSUFFICIENT_BALANCE" }

	if(data.amount == 0)
		return { status: 403, code: "CAN_NOT_WITHDRAW_ZERO" }

	if(userObj.bank.length < 1)
		return { status: 403, code: "BANK_NOT_ADDED" }

	let recieptResult = await createReceipt({
		name: userObj.fullname,
		account_number: userObj.bank[0].account.account_number,
		bank_code: userObj.bank[0].account.bank_code
	})
	if(recieptResult.status != 200)
		return recieptResult

	let oldBalance = +userObj.balance, newBalance = oldBalance - data.amount
	userObj = await userDb.appendDoc({ _id: data.user.id }, "balance", newBalance)

	// console.log(recieptResult)
	let transferResult = await initiateTransfer({
		amount: data.amount * 100,
		recipient: recieptResult.data.recipient_code
	})
	if(transferResult.status != 200){
		await userDb.appendDoc({ _id: data.user.id }, "balance", oldBalance)
		return transferResult
	}


	//Once the transfer is successful, we record the transaction with the reference
	let withdrawTransaction = await transactionDb.createTransaction({
		username: userObj.fullname,
		user_id: userObj.user_id,
		amount: data.amount,
		reference: transferResult.data.reference,
		type: "withdrawal",
		status: "success",
		data: { transfer_code: transferResult.data.transfer_code }
	})
	console.log(withdrawTransaction)
	// console.log("Transfer result", transferResult)

	return { status: 200, code: "WITHDRAWAL_SUCCESSFUL" }

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
	// console.log(arguments)
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
		console.log(response.data)
		if(response.data.status)
			return { status: 200, code: "TRANSFER_SUCCESSFUL", data: response.data.data }
		return { status: 500, code: "TRANSFER_FAILED" }
	}

	function handleFailure(response){
		return { status: 500, code: "TRANSFER_FAILED" }
	}
}