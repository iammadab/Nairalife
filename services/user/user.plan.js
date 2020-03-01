const { createValidator } = require("lazy-validator")

// Period - daily, weekly, monthly
const userPlanValidator = createValidator("total_amount.number, period.string, car_amount.number, car_name.string.lowercase, total_weeks.number")

const userDb = require("../../data/db/user.db")

async function userPlan(data){
	let validationResult = userPlanValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let validData = validationResult.data

	let userObj = await userDb.findOneWith({ _id: data.user.id })
	if(!userObj)
		return { status: 403, code: "USER_NOT_FOUND" }

	if(userObj.stage != "choose_plan")
		return { status: 403, code: "INVALID_STAGE" }

	// First, update the first stage payment value
	let paymentOneDetails = { amount: 1000, period: "daily", total: 90000 }
	userObj = await userDb.appendDoc({ _id: data.user.id }, "payment_one", paymentOneDetails)
	if(!userObj)
		return { status: 403, code: "PROBLEM_UPDATING_PAYMENT_ONE" }

	userObj = await userDb.appendDoc({ _id: data.user.id }, "status", "payment_one")
	if(!userObj)
		return { status: 403, code: "PROBLEM_UPDATING_STATUS" }

	validData.amount = Math.ceil((validData.total_amount - userObj.payment_one.total) / validData.total_weeks)
	userObj = await userDb.appendDoc({ _id: data.user.id }, "plan", validData)
	if(!userObj)
		return { status: 403, code: "PROBLEM_UPDATING_PLAN" }

	userObj = await userDb.appendDoc({ _id: data.user.id }, "stage", "plan_approval")
	if(!userObj)
		return { status: 403, code: "PROBLEM_UPDATING_STAGE" }

	return { status: 200, code: "PLAN_UPDATED" }
}

module.exports = userPlan