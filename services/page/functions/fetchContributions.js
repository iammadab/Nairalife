const contributionDb = require("../../../data/db/contribution.db")

async function fetchContributions(querySpecifier){
	return contributionDb.findWith(querySpecifier)
}

module.exports = fetchContributions