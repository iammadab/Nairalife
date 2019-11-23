const fetchUser = require("./fetchUser")
const fetchBanks = require("./fetchBanks")
const fetchGroups = require("./fetchGroups")
const fetchGroup = require("./fetchGroup")

const pageFunctions = {
	fetchUser,
	fetchBanks,
	fetchGroups,
	fetchGroup
}

module.exports = pageFunctions