const { createValidator } = require("lazy-validator")
const axios = require("axios")

const getBankValidator = createValidator("bank_code.string")

let requestOptions = {
	headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`}
}

async function getBank(data){
	let validationResult = getBankValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let { bank_code } = validationResult.data

	let banks = await axios.get("https://api.paystack.co/bank", requestOptions)
	if(!(banks.data && banks.data.data))
		return { status: 500, code: "FAILED_TO_FETCH_BANKS" }

	let banksData = banks.data.data
	let bank = banksData.filter(eachBank => {
		return eachBank.code == bank_code
	})

	if(bank.length < 1)
		return { status: 403, code: "BANK_NOT_FOUND" }

	return { status: 200, code: "BANK_FETCHED", bank: bank[0] }
}

module.exports = getBank