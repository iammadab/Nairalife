// const userDb = require("../")
async function userExist(data){
	let acceptableKeys = ["fullname", "phone", "email"]
	let searchQuery = {}

	Object.keys(data).forEach(key => {
		if(acceptableKeys.includes(key))
			searchQuery[key] = data[key]
	})

	if(Object.keys(searchQuery).length < 1)
		return { status: 400, code: "NO_ACCEPTABLE_KEY", message: `Acceptable keys are: ${acceptableKeys.join(", ")}` }
}

module.exports = userExist