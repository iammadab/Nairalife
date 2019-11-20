const { createValidator } = require("lazy-validator")

const verifyBankValidator = createValidator("account_number.string, bank_code.string, bvn.string")

async function verifyBank(data){
	let validationResult = verifyBankValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }
}

module.exports = verifyBank