const createGroup = require("./group.create")
const addMember = require("./group.addMember")
const removeMember = require("./group.removeMember")
const addComment = require("./group.addComment")

const groupServices = {
	createGroup,
	addMember,
	removeMember,
	addComment
}

module.exports = groupServices