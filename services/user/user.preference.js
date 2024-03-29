const { createValidator } = require("lazy-validator")

// partner.string.lowercase, work_duration.string.lowercase, work_description.string, own_car.string.lowercase, earning.string.lowercase, reason.string
const userPreferenceValidator = createValidator("sex.string.lowercase, relationship.string.lowercase, age.number, bio.string, education.string.lowercase")

const userDb = require("../../data/db/user.db")

async function userPreference(data){
	const userPreferenceValidationResult = userPreferenceValidator.parse(data)
	if(userPreferenceValidationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: userPreferenceValidationResult.errors }
	
	validData = userPreferenceValidationResult.data

	let userObj = await userDb.appendDoc({ _id: data.user.id }, "about", validData)
	userObj = await userDb.appendDoc({ _id: data.user.id }, "stage", "enter_business")

	if(userObj)
		return { status: 200, code: "USER_PREFERENCE_SET" }
}

module.exports = userPreference