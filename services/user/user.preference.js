const { createValidator } = require("lazy-validator")

// const userPreferenceValidator = createValidator("sex.string.lowercase, relationship.string.lowercase, title.string.lowercase, bio.string.lowercase, work.string.lowercase, work_description.string.lowercase, earning.string.lowercase, contribution_receive.string.lowercase, contribtuion_make.string.lowercase, contribution_use.string.lowercase")
const userPreferenceValidator = createValidator("sex.string")

const userDb = require("../../data/db/user.db")

async function userPreference(data){
	const userPreferenceValidationResult = userPreferenceValidator.parse(data)
	if(userPreferenceValidationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: userPreferenceValidationResult.errors }
	
	let userPhone = data.user.phone
	delete data.user
	delete data.token
	console.log(data)
	
	let userObj = await userDb.appendDoc({ phone: userPhone }, "about", data)
	console.log(userObj)
}

module.exports = userPreference