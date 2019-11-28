const userDb = require("../../data/db/user.db")

async function startAutosave(data){
	let userObj = await userDb.findOneWith({ _id: data.user.id })
	if(!userObj)
		return { status: 403, code: "USER_NOT_FOUND" }

	userObj = await userDb.appendDoc({ _id: data.user.id }, "status", "autosave")
	if(!userObj)
		return { status: 403, code: "PROBLEM_SETTING_STATUS" }

	userObj = await userDb.appendDoc({ _id: data.user.id }, "stage", "active")
	if(!userObj)
		return { status: 403, code: "PROBLEM_SETTING_STAGE" }

	

}

module.exports = startAutosave