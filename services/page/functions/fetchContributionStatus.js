const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

const contributionDb = require("../../../data/db/contribution.db")
const transactionDb = require("../../../data/db/transaction.db")

async function getContributionStatus(contribution_id){
	let allTransactions = await transactionDb.findWith({ "data.contribution_id": ObjectId(contribution_id) })
	let successfullTransactions = await transactionDb.findWith({ status: "success", "data.contribution_id": ObjectId(contribution_id) })
	
	let defaultRate
	if(allTransactions.length == 0)
		defaultRate = 0
	else
		defaultRate = ((allTransactions.length - successfullTransactions.length) / allTransactions.length) * 100
	
	let totalContribution = 0

	for(let i = 0; i < successfullTransactions.length; i++){
		totalContribution += successfullTransactions.amount
	}

	return {
		defaultRate,
		totalContribution
	}
}

module.exports = getContributionStatus