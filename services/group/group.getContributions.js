const { createValidator } = require("lazy-validator")

const getContributionsValidator = createValidator("group_id.number")

const groupDb = require("../../data/db/group.db")
const userDb = require("../../data/db/user.db")

const paymentService = require("../payment")

async function getContributions(data){
	let validationResult = getContributionsValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let validData = validationResult.data

	let groupObj = await groupDb.findOneWith({ group_id: validData.group_id })
	if(!groupObj)
		return { status: 200, code: "GROUP_NOT_FOUND" }

	for(let i = 0; i < groupObj.members.length; i++){
		if(groupObj.members[i].removed) continue
		let memberData = groupObj.members[i]
		let userObj = await userDb.findOneWith({ user_id: memberData.user_id })
		if(!userObj) continue

		let chargeResult = await paymentService.charge({
			authorization_code: userObj.card[0].authorization.authorization_code,
			email: userObj.email,
			amount: groupObj.contribution_amount
		})

		console.log(chargeResult)
	}

}

module.exports = getContributions