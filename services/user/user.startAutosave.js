const userDb = require("../../data/db/user.db")

const save = require("./user.save")
const addPoints = require("./user.addPoints")

async function startAutosave(data){
	let userObj = await userDb.findOneWith({ _id: data.user.id })
	if(!userObj)
		return { status: 403, code: "USER_NOT_FOUND" }

	userObj = await userDb.appendDoc({ _id: data.user.id }, "status", "autosave")
	if(!userObj)
		return { status: 403, code: "PROBLEM_SETTING_STATUS" }

	// Set the autosave start date
	userObj = await userDb.appendDoc({ _id: data.user.id }, "autosave_start", new Date())
	if(!userObj)
		return { status: 403, code: "PROBLEM_SETTING_DATE" }

	userObj = await userDb.appendDoc({ _id: data.user.id }, "stage", "active")
	if(!userObj)
		return { status: 403, code: "PROBLEM_SETTING_STAGE" }

	const saveResult = await save({ user_id: userObj.user_id })
	const pointsResult = await addPoints({
		user_id: userObj.user_id,
		type: "bonus",
		comment: "You have received 50 bonus points for starting autosave",
		points: 50
	})
	console.log(pointsResult)

	return { status: 200, code: "STARTED_AUTOSAVE" }
}

module.exports = startAutosave