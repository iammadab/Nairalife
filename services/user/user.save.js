const { createValidator } = require("lazy-validator")

const saveValidator = createValidator("user_id.number")

async function save(data){
	let validationResult = saveValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }
}

module.exports = save