const { createValidator } = require("lazy-validator")

const houseValidator = createValidator("address.string, landmark.string, city.string, state.string")

const userDb = require("../../data/db/user.db")

async function addHouse(data){
	let validationResult = houseValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", error: validationResult.errors }

	let { address, landmark, city, state } = validationResult.data

	let userObj = await userDb.findOneWith({ _id: data.user.id })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }
 
	userObj = await userDb.appendDoc({ _id: data.user.id }, "house", { address, landmark, city, state })
	if(!userObj)
		return	{ status: 500, code: "PROBLEM_ADDING_HOUSE" }

	userObj = await userDb.appendDoc({ _id: data.user.id }, "loan_stage", "request")
	if(!userObj)
		return { status: 500, code: "PROBLEM_UPDATING_STAGE" }

	return { status: 200, code: "ADDED_HOUSE" }
}

module.exports = addHouse