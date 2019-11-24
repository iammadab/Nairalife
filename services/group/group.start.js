const { createValidator } = require("lazy-validator")

const startGroupValidator = createValidator("group_id.number")

async function startGroup(data){
	let validationResult = startGroupValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }
}

module.exports = startGroup