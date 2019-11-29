const pageFunctions = require("./functions")

async function points(req, res, next){
	let allPoints = await pageFunctions.fetchPoints({ user_id: req.body.user.id })

	req.body.pageData = {
		allPoints
	}

	next()
}

module.exports = points