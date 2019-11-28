const pageFunctions = require("./functions")

async function auto(req, res, next){
	let autoSaveMembers = await pageFunctions.fetchUsers({ status: "autosave" })

	req.body.pageData = {
		autoSaveMembers
	}

	next()
}

module.exports = auto