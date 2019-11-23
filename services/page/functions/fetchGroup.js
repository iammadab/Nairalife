const groupDb = require("../../../data/db/group.db")

async function fetchGroup(group_id){
	return await groupDb.findOneWith({ group_id })
}

module.exports = fetchGroup