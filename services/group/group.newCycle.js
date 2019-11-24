const { createValidator } = require("lazy-validator")

const newCycleValidator = createValidator("group_id.number")

async function newCycle(data){
	let validationResult = newCycleValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }
}

module.exports = newCycle