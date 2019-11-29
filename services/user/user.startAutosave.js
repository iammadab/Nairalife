const userDb = require("../../data/db/user.db")

const save = require("./user.save")
console.log(save)

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
	console.log(saveResult)

	return { status: 200, code: "STARTED_AUTOSAVE" }
}

module.exports = startAutosave