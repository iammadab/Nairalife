const { createValidator } = require("lazy-validator")

const userPlanValidator = createValidator("total_amount.number, period.string, amount.number")

const userDb = require("../../data/db/user.db")

async function userPlan(data){
	let validationResult = userPlanValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let validData = validationResult.data

	let userObj = await userDb.findOneWith({ _id: data.user.id })
	if(!userObj)
		return { status: 403, code: "USER_NOT_FOUND" }

	userObj = await userDb.appendDoc({ _id: data.user.id }, "plan", validData)
	if(!userObj)
		return { status: 403, code: "PROBLEM_UPDATING_PLAN" }

	userObj = await userDb.appendDoc({ _id: data.user.id }, "stage", "plan_approval")
	if(!userObj)
		return { status: 403, code: "PROBLEM_UPDATING_STAGE" }

	return { status: 200, code: "PLAN_UPDATED" }
}

module.exports = userPlan