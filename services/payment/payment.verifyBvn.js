const { createValidator } = require("lazy-validator")

const bvnValidator = createValidator("bvn.number")

async function verifyBvn(data){
	let validationResult = bvnValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_CODE", errors: validationResult.errors }
}

module.exports = verifyBvn