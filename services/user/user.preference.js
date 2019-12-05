const { createValidator } = require("lazy-validator")

const userPreferenceValidator = createValidator("sex.string.lowercase, relationship.string.lowercase, title.string.lowercase, bio.string, partner.string.lowercase, work_description.string, own_car.string.lowercase, earning.string.lowercase")
// const userPreferenceValidator = createValidator("sex.string")

const userDb = require("../../data/db/user.db")

async function userPreference(data){
	const userPreferenceValidationResult = userPreferenceValidator.parse(data)
	if(userPreferenceValidationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: userPreferenceValidationResult.errors }
	
	validData = userPreferenceValidationResult.data

	let userObj = await userDb.appendDoc({ _id: data.user.id }, "about", validData)
	userObj = await userDb.appendDoc({ _id: data.user.id }, "stage", "start_autosave")

	if(userObj)
		return { status: 200, code: "USER_PREFERENCE_SET" }
}

module.exports = userPreference