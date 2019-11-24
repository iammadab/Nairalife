const pageFunctions = require("./functions")

async function dashboard(req, res, next){
	let userObj = await pageFunctions.fetchUser(req.body.user.id)
	let groupObj = await pageFunctions.fetchGroup(userObj.group)
	let members = []

	groupObj.members..forEach(async member => {
		if(member.removed) return
		let memberObj = await pageFunctions.fetchUser(member.user_id)
		members.push(memberObj)
	})

	req.body.pageData = {
		user: userObj,
		group: groupObj,
		members
	}

	next()
}

module.exports = dashboard