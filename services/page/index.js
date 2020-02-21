const dashboard = require("./page.dashboard")
const settings = require("./page.settings")
const account = require("./page.account")
const groups = require("./page.groups")
const group = require("./page.group")
const fees = require("./page.fees")
const transactions = require("./page.transactions")
const members = require("./page.members")
const auto = require("./page.auto")
const points = require("./page.points")
const userTransaction = require("./page.userTransaction")
const notifications = require("./page.notifications")
const user = require("./page.user")
const profile = require("./page.profile")
const stat = require("./page.stat")
const transaction = require("./page.transaction")
const cars = require("./page.cars")

const pageServices = {
	dashboard,
	settings,
	account,
	groups,
	group,
	fees,
	transactions,
	members,
	auto,
	points,
	userTransaction,
	notifications,
	user,
	profile,
	stat,
	transaction,
	cars
}

module.exports = pageServices