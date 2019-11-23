const { createValidator } = require("lazy-validator")

const updateProfileValidator = createValidator("sex.string.lowercase, title.string.lowercase, relationship.string.lowercase, bio.string.lowercase")

const userDb = require("../../data/db/user.db")

async function updateProfile(data){
	let validationResult = updateProfileValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let userObj = await userDb.findOneWith({ _id: data.user.id })
	let accepted = ["sex", "title", "relationship", "bio"], update = {}
	accepted.forEach(prop => {
		if(data[prop])
			update[prop] = data[prop]
	})

	let about = Object.assign({}, userObj._doc.about, update)
	// userObj = await userDb.appendDoc({ _id: data.user.id }, "fullname", data.fullname)
	userObj = await userDb.appendDoc({ _id: data.user.id }, "about", about)
	
	if(userObj)
		return { status: 200, code: "UPDATED_USER_PROFILE" }

	return { status: 500, code: "PROBLEM_UPDATING_USER" }
}

module.exports = updateProfile