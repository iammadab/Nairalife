const contributionDb = require("../../../data/db/contribution.db")
const transactionDb = require("../../../data/db/transaction.db")

async function getContributionStatus(contribution_id){
	let transactions = await transactionDb.findWith({ "data.contribution_id": contribution_id })
	console.log(transactions)
}

module.exports = getContributionStatus