const { createValidator } = require("lazy-validator")

const startGroupValidator = createValidator("group_id.number")

const groupDb = require("../../data/db/group.db")
const userDb = require("../../data/db/user.db")

async function startGroup(data){
	let validationResult = startGroupValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let userObj = await userDb.findOneWith({ _id: data.user.id })
	if(!userObj)
		return { status: 403, code: "USER_NOT_FOUND" }

	let groupObj = await groupDb.findOneWith({ group_id: data.group_id })
	if(!groupObj)
		return { status: 403, code: "GROUP_NOT_FOUND" }


	if(groupObj.status != "inactive")
		return { status: 403, code: "GROUP_HAS_STARTED" }

	let members = groupObj.members, membersMap = {}
	for(let i = 0; i < members.length; i++){
		membersMap[members[i].user_id] = await userDb.findOneWith({ user_id: members[i].user_id })
	}


	// Using the order function, we sort the members based on their nairascore and the date they joined the platform
	members.sort(orderFunction)

	// This is needed to know how many days to add between the members as the receiving date is dynamically generated
	let periodMap = {
		daily: 1,
		weekly: 7,
		monthly: 30
	}

	// Add the receiving date to each member
	let currentDate = new Date(), groupPeriod = periodMap[groupObj.contribution_period]
	members.forEach(member => {
		if(member.removed) return 
		member.receiving_date = addDays(currentDate, groupPeriod)
		currentDate = member.receiving_date
	})


	// groupObj = groupDb.appendDoc({ group_id: data.group_id }, "started_by", userObj.fullname)
	// groupObj = groupDb.appendDoc({ group_id: data.group_id }, "members", members)








	// if you return -1 a comes before b
	// if you return 1 b comes before a
	// if you return 0 they remain in their positions
	function orderFunction(a, b){
		let userA = membersMap[a.user_id], userB = membersMap[b.user_id]

		if(userA.nairascore > userB.nairascore) return -1
		if(userA.nairascore > userB.nairascore) return 1
		
		let userAJoinDate = userA._id.getTimestamp(), userBJoinDate = userB._id.getTimestamp()
		if(userAJoinDate < userBJoinDate) return -1
		if(userAJoinDate > userBJoinDate) return 1

		return 0
	}
}

module.exports = startGroup


function addDays(date, days) {
	const newDate = new Date(Number(date))
 	newDate.setDate(date.getDate() + days)
 	return newDate
}