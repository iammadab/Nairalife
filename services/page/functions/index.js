const fetchUser = require("./fetchUser")
const fetchBanks = require("./fetchBanks")
const fetchGroups = require("./fetchGroups")
const fetchGroup = require("./fetchGroup")
const fetchComments = require("./fetchComments")

const pageFunctions = {
	fetchUser,
	fetchBanks,
	fetchGroups,
	fetchGroup,
	fetchComments
}

module.exports = pageFunctions