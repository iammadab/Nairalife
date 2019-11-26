const { createValidator } = require("lazy-validator")

const getContributionsValidator = createValidator("group_id.number")

async function getContributions(data){
	let validationResult = getContributionsValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let validData = validationResult.data
}

module.exports = getContributions