const groupDb = require("../../../data/db/group.db")

async function fetchGroups(){
	return await groupDb.findWith({})
}

module.exports = fetchGroups