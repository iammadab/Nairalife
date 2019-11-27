const contributionDb = require("../../../data/db/contribution.db")

async function fetchContributions(group_id){
	return contributionDb.findWith({ group_id })
}

module.exports = fetchContributions