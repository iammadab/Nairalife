const pageFunctions = require("./functions")

async function group(req, res, next){
	let group_id = req.params.group_id,
		groupObj = await pageFunctions.findOneWith({ group_id })

	console.log(groupObj)
	next()
}

module.exports = group