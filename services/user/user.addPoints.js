const { createValidator } = require("lazy-validator")

const addPointsValidator = createValidator("user_id.number, type.string, comment.string, points.number")

async function addPoints(data){
	let validationResult = addPointsValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }
}

module.exports = addPoints