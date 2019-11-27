const fetchUser = require("./fetchUser")
const fetchBanks = require("./fetchBanks")
const fetchGroups = require("./fetchGroups")
const fetchGroup = require("./fetchGroup")
const fetchComments = require("./fetchComments")
const fetchContributions = require("./fetchContributions")

const pageFunctions = {
	fetchUser,
	fetchBanks,
	fetchGroups,
	fetchGroup,
	fetchComments,
	fetchContributions
}

module.exports = pageFunctions