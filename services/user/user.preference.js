const { createValidator } = require("lazy-validator")

const userPreferenceValidator = createValidator("sex.string.lowercase, relationship.string.lowercase, title.string.lowercase, bio.string.lowercase, work.string.lowercase, work_description.string.lowercase, earning.string.lowercase, contribution_receive.string.lowercase, contribtuion_make.string.lowercase, contribution_use.string.lowercase")

async function userPreference(data){
	const userPreferenceValidationResult = userPreferenceValidator.parse(data)
	if(userPreferenceValidationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: userPreferenceValidationResult.errors }
}

module.exports = userPreference