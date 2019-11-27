const { createValidator } = require("lazy-validator")

const getContributionsValidator = createValidator("group_id.number")

const groupDb = require("../../data/db/group.db")
const userDb = require("../../data/db/user.db")
const transactionDb = require("../../data/db/transaction.db")
const contributionDb = require("../../data/db/contribution.db")

const paymentService = require("../payment")

async function getContributions(data){
	let validationResult = getContributionsValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let validData = validationResult.data

	let groupObj = await groupDb.findOneWith({ group_id: validData.group_id })
	if(!groupObj)
		return { status: 200, code: "GROUP_NOT_FOUND" }


	// This is where I go through each group member
	// Then pass their details to the payment charge service
	for(let i = 0; i < groupObj.members.length; i++){
		if(groupObj.members[i].removed) continue
		let memberData = groupObj.members[i]

		// Attempt charge
		let chargeResult = await paymentService.charge({
			user_id: memberData.user_id,
			amount: groupObj.contribution_amount
		})

		// The transaction object for the user
		// The webhook will be the one to update the transactions based on the reference
		let userTransaction = await transactionDb.createTransaction({
			username: memberData.fullname,
			user_id: memberData.user_id,
			amount: groupObj.contribution_amount,
			reference: chargeResult.data.reference,
			type: "contribution",
			status: "pending"
		})		
	}

}

module.exports = getContributions