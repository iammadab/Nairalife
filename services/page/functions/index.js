const fetchUser = require("./fetchUser")
const fetchUsers = require("./fetchUsers")
const fetchBanks = require("./fetchBanks")
const fetchGroups = require("./fetchGroups")
const fetchGroup = require("./fetchGroup")
const fetchComments = require("./fetchComments")
const fetchContributions = require("./fetchContributions")
const fetchContributionStatus = require("./fetchContributionStatus")
const createDate = require("./createDate")
const fetchTransactions = require("./fetchTransactions")
const fetchPoints = require("./fetchPoints")
const fetchNotifications = require("./fetchNotifications")
const fetchCars = require("./fetchCars")

const pageFunctions = {
	fetchUser,
	fetchUsers,
	fetchBanks,
	fetchGroups,
	fetchGroup,
	fetchComments,
	fetchContributions,
	fetchContributionStatus,
	createDate,
	fetchTransactions,
	fetchPoints,
	fetchNotifications,
	fetchCars
}

module.exports = pageFunctions