const createGroup = require("./group.create")
const addMember = require("./group.addMember")
const removeMember = require("./group.removeMember")
const addComment = require("./group.addComment")
const startGroup = require("./group.start")
const newCycle = require("./group.newCycle")
const getContributions = require("./group.getContributions")

const groupServices = {
	createGroup,
	addMember,
	removeMember,
	addComment,
	startGroup,
	newCycle,
	getContributions
}

module.exports = groupServices