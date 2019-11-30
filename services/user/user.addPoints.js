const { createValidator } = require("lazy-validator")

const addPointsValidator = createValidator("user_id.number, type.string, comment.string, points.number")

const userDb = require("../../data/db/user.db")
const pointDb = require("../../data/db/point.db")

async function addPoints(data){
	let validationResult = addPointsValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let validData = validationResult.data, adminObj = {}

	if(data.user.id){
		adminObj = await userDb.findOneWith({ _id: data.user.id })
		if(!adminObj)
			return { status: 403, code: "UNAUTHORIZED" }
	}

	let userObj = await userDb.findOneWith({ user_id: validData.user_id })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	// Get the old points, replace with 0 if it doesn't exist , calculate the new point and update the user
	let oldPoints = userObj.nairapoints || 0, newPoints = oldPoints + validData.points
	userObj = await userDb.appendDoc({ user_id: validData.user_id }, "nairapoints", newPoints)

	if(!userObj)
		return { status: 403, code: "PROBLEM_ADDING_POINTS" }

	let newPoint = await pointDb.createPoint({
		user_id: userObj.user_id,
		type: validData.type,
		comment: validData.comment,
		points: validData.points,
		admin_id: adminObj.user_id,
		admin: adminObj.fullname
	})

	return { status: 200, code: "UPDATED_USER_POINTS" }
}

module.exports = addPoints