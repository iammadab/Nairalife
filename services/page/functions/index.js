const fetchUser = require("./fetchUser")
const fetchBanks = require("./fetchBanks")
const fetchGroups = require("./fetchGroups")

const pageFunctions = {
	fetchUser,
	fetchBanks,
	fetchGroups
}

module.exports = pageFunctions