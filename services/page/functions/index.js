const fetchUser = require("./fetchUser")
const fetchBanks = require("./fetchBanks")
const fetchGroups = require("./fetchGroups")
const fetchGroup = require("./fetchGroup")
const fetchComments = require("./fetchComments")
const fetchContributions = require("./fetchContributions")
const fetchContributionStatus = require("./fetchContributionStatus")
const createDate = require("./createDate")
const fetchTransactions = require("./fetchTransactions")

const pageFunctions = {
	fetchUser,
	fetchBanks,
	fetchGroups,
	fetchGroup,
	fetchComments,
	fetchContributions,
	fetchContributionStatus,
	createDate,
	fetchTransactions
}

module.exports = pageFunctions