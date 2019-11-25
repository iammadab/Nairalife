const pageFunctions = require("./functions")

const userDb = require("../../data/db/user.db")

async function dashboard(req, res, next){
	let userObj = await pageFunctions.fetchUser(req.body.user.id)
	let groupObj = await pageFunctions.fetchGroup(userObj.group)
	let members = [], comments = []

	if(groupObj){
		for(let i = 0; i < groupObj.members.length; i++){
			let member = groupObj.members[i]
			if(member.removed) continue
			let memberObj = await userDb.findOneWith({ user_id: member.user_id })
			members.push({ ...memberObj._doc, join_date: member.join_date })
		}
	}

	if(groupObj){
		comments = await pageFunctions.fetchComments({ group_id: groupObj.group_id }, { sort: { created_at: -1 }})
	}
	
	req.body.pageData = {
		user: userObj,
		group: groupObj,
		members,
		comments
	}

	next()
}

module.exports = dashboard