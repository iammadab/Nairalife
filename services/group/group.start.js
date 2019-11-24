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


function orderFunction(a, b){
	console.log(a, b)
	return 0
}