const { createValidator } = require("lazy-validator")

// const userPreferenceValidator = createValidator("sex.string.lowercase, relationship.string.lowercase, title.string.lowercase, bio.string.lowercase, work.string.lowercase, work_description.string.lowercase, earning.string.lowercase, contribution_receive.string.lowercase, contribtuion_make.string.lowercase, contribution_use.string.lowercase")
const userPreferenceValidator = createValidator("sex.string")

const userDb = require("../../data/db/user.db")

async function userPreference(data){
	const userPreferenceValidationResult = userPreferenceValidator.parse(data)
	if(userPreferenceValidationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: userPreferenceValidationResult.errors }
	
	let user_id = data.user.id
	delete data.user
	delete data.token

	let userObj = await userDb.appendDoc({ _id: user_id }, "about", data)
	userObj = await userDb.appendDoc({ _id: user_id }, "stage", "active")

	if(userObj)
		return { status: 200, code: "USER_PREFERENCE_SET" }
}

module.exports = userPreference