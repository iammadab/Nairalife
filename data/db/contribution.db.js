const createDb = require("./base.db")
const contributionModel = require("../models/contribution.model")
const contributionDb = createDb(contributionModel)

contributionDb.createContribution = function({ admin, admin_id, group_id }){
	let newcontribution = new contributionModel({
		admin,
		admin_id,
		group_id
	})

	return newcontribution.save()
}

module.exports = contributionDb