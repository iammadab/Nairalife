const createGroup = require("./group.create")
const addMember = require("./group.addMember")
const removeMember = require("./group.removeMember")
const addComment = require("./group.addComment")
const startGroup = require("./group.start")

const groupServices = {
	createGroup,
	addMember,
	removeMember,
	addComment,
	startGroup
}

module.exports = groupServices