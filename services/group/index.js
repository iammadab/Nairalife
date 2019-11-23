const createGroup = require("./group.create")
const addMember = require("./group.addMember")
const removeMember = require("./group.removeMember")

const groupServices = {
	createGroup,
	addMember,
	removeMember
}

module.exports = groupServices