const pointDb = require("../../../data/db/point.db")

async function fetchPoints(query = {}){
	return pointDb.findWith(query)
}

module.exports = fetchPoints