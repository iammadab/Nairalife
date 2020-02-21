const { createValidator } = require("lazy-validator")

// Period - daily, weekly, monthly
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

	let paymentOneDetails = { amount: 1000, period: "daily" }
	userObj = await userDb.appendDoc({ _id: data.user.id }, "payment_one", paymentOneDetails)
	if(!userObj)
		return { status: 403, code: "PROBLEM_UPDATING_PAYMENT_ONE" }


	userObj = await userDb.appendDoc({ _id: data.user.id }, "status", "payment_one")
	if(!userObj)
		return { status: 403, code: "PROBLEM_UPDATING_STATUS" }

	return { status: 200, code: "PLAN_UPDATED" }
}

module.exports = userPlan