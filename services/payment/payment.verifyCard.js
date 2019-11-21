const { createValidator } = require("lazy-validator")

const verifyCardValidator = createValidator("reference.string")

async function verifyCard(data){
	let validationResult = verifyCardValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }
}

module.exports = verifyCard