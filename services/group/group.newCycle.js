const { createValidator } = require("lazy-validator")

const newCycleValidator = createValidator("group_id.number")

const groupDb = require("../../data/db/group.db")

const createGroup = require("./group.create")

async function newCycle(data){
	let validationResult = newCycleValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let groupObj = await groupDb.findOneWith({ group_id: data.group_id })
	if(!groupObj)
		return { status: 403, code: "GROUP_DOES_NOT_EXIST" }

	// Creating the new group based on the data of the old group
	let newGroupResult = await createGroup({
		group_title: groupObj.group_title,
		group_description: groupObj.group_description, 
		group_goals: groupObj.group_goals,
		total_members: groupObj.total_members,
		contribution_amount: groupObj.contribution_amount,
		contribution_period: groupObj.contribution_period
	})
	if(newGroupResult.status != 200)
		return newGroupResult

	// Gotten the new group
	let newGroupObj = newGroupResult.group

	//The next step is to get the members of the old group into the new one
	//and the comments also
	newGroupObj = await groupDb.appendDoc({ group_id: newGroupObj.group_id }, "members", groupObj.members)
	newGroupObj = await groupDb.appendDoc({ group_id: newGroupObj.group_id }, "comments", groupObj.comments)


}

module.exports = newCycle