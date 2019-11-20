const { createValidator } = require("lazy-validator")

const addBankValidator = createValidator("account.object, bvn.object, user.object")

async function addBank(data){
	let validationResult = addBankValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }
}

module.exports = addBank