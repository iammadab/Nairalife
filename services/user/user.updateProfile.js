const { createValidator } = require("lazy-validator")

const updateProfileValidator = createValidator("fullname.string.lowercase, sex.string.lowercase, title.string.lowercase, relationship.string.lowercase, bio.string.lowercase")

async function updateProfile(data){
	let validationResult = updateProfileValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }
}

module.exports = updateProfile