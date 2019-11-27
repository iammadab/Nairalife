const { createValidator } = require("lazy-validator")

const addPointsValidator = createValidator("user_id.number, type.string, comment.string, points.number")

const userDb = require("../../data/db/user.db")

async function addPoints(data){
	let validationResult = addPointsValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let validData = validationResult.data

	let userObj = await userDb.findOneWith({ user_id: validData.user_id })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	let oldPoints = userObj.nairapoints || 0, newPoints = oldPoints + validData.points
	console.log(oldPoints, newPoints)
	console.log("New points is ", newPoints)
	userObj = await userDb.appendDoc({ user_id: validData.user_id }, "nairapoints", newPoints)

	console.log(userObj)

}

module.exports = addPoints