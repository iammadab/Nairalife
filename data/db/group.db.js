const createDb = require("./base.db")
const groupModel = require("../models/group.model")
const groupDb = createDb(groupModel)

groupDb.createUser = function({ group_id, group_title, group_description, group_goals, total_members, contribution_amount, contribution_period }){
	let newGroup = new groupModel({
		group_id,
		group_title,
		group_description,
		group_goals,
		total_members,
		contribution_amount,
		contribution_period
	})

	return newGroup.save()
}

module.exports = groupDb