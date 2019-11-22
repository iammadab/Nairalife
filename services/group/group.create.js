const { createValidator } = require("lazy-validator")

const createGroupValidator = createValidator("group_title.string, group_description.string, group_goals.string, total_members.number, contribution_amount.number, contribution_period.string")

const groupDb = require("../../data/db/group.db")

async function createGroup(data){
	let validationResult = createGroupValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let groupData = validationResult.data
	groupData.group_id = await uniqueGroupId()


}

module.exports = createGroup

async function uniqueGroupId(count){
	count = count || 1
	let randomId = randomDigit(4)
	let groupObj = await groupDb.findOneWith({ group_id: randomId })
	if(!groupObj) { 
		console.log(`Found unique code for group in ${count} attempt`); 
		return randomId 
	}
	return uniqueGroupId()
}