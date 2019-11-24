const { createValidator } = require("lazy-validator")

const startGroupValidator = createValidator("group_id.number")

const groupDb = require("../../data/db/group.db")
const userDb = require("../../data/db/user.db")

async function startGroup(data){
	let validationResult = startGroupValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let groupObj = await groupDb.findOneWith({ group_id: data.group_id })
	if(!groupObj)
		return { status: 403, code: "GROUP_NOT_FOUND" }

	if(groupObj.status != "inactive")
		return { status: 403, code: "GROUP_HAS_STARTED" }

	let members = groupObj.members
	console.log(members)
	console.log("")
	members.sort(orderFunction)
	console.log(members)



}

module.exports = startGroup

// if you return -1 a comes before b
// if you return 1 b comes before a
// if you return 0 they remain in their positions
async function orderFunction(a, b){
	let userA = await userDb.findOneWith({ user_id: a.user_id })
	let userB = await userDb.findOneWith({ user_id: b.user_id })

	if(userA.nairascore > userB.nairascore) return -1
	if(userA.nairascore > userB.nairascore) return 1
	if(userA.nairascore == userB.nairascore) return 0
		
}