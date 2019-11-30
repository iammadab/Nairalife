const pageFunctions = require("./functions")

async function points(req, res, next){
	let allPoints = await pageFunctions.fetchPoints({ user_id: req.body.user.user_id })
	
	allPoints.forEach(pointDoc => {
		pointDoc._doc.created_at = pageFunctions.createDate(pointDoc._id.getTimestamp()).getHypenDate()
	})

	req.body.pageData = {
		allPoints
	}

	next()
}

module.exports = points