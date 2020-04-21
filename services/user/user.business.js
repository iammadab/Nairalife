const { createValidator } = require("lazy-validator")

// partner.string.lowercase, work_duration.string.lowercase, work_description.string, own_car.string.lowercase, earning.string.lowercase, reason.string
const userBusinessValidator = createValidator("partner.string.lowercase, work_duration.string.lowercase, rating.number, trips.number, city.string.lowercase, work_description.string, own_car.string.lowercase, weekly_earning.number")

const userDb = require("../../data/db/user.db")

async function userBusiness(data){
	const userBusinessValidationResult = userBusinessValidator.parse(data)
	if(userBusinessValidationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: userBusinessValidationResult.errors }
	
	validData = userBusinessValidationResult.data

	let userObj = await userDb.appendDoc({ _id: data.user.id }, "business", validData)
	userObj = await userDb.appendDoc({ _id: data.user.id }, "stage", "add_proof")

	if(userObj)
		return { status: 200, code: "USER_BUSINESS_SET" }
}

module.exports = userBusiness