const dashboard = require("./page.dashboard")
const settings = require("./page.settings")
const account = require("./page.account")
const groups = require("./page.groups")
const group = require("./page.group")
const fees = require("./page.fees")
const transactions = require("./page.transactions")
const members = require("./page.members")

const pageServices = {
	dashboard,
	settings,
	account,
	groups,
	group,
	fees,
	transactions,
	members
}

module.exports = pageServices