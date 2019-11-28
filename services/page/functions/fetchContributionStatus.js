const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

const contributionDb = require("../../../data/db/contribution.db")
const transactionDb = require("../../../data/db/transaction.db")

async function getContributionStatus(contribution_id){
	let transactions = await transactionDb.findWith({ "data.contribution_id": ObjectId(contribution_id) })
	console.log(transactions)
}

module.exports = getContributionStatus

getContributionStatus("5dddc04639a7aa1af06ea06e").then(console.log)