const { createValidator } = require("lazy-validator")

const createGroupValidator = createValidator("group_title.string, group_description.string, group_goals.string, total_members.number, contribution_amount.number, contribution_period.string")

async function createGroup(data){
	let validationResult = createGroupValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }
}

module.exports = createGroup