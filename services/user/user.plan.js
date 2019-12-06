const { createValidator } = require("lazy-validator")

const userPlanValidator = createValidator("total_amount.number, period.string, amount.number")

async function userPlan(data){
	let validationResult = userPlanValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }
}

module.exports = userPlan