const dashboard = require("./page.dashboard")
const settings = require("./page.settings")
const account = require("./page.account")
const groups = require("./page.groups")
const group = require("./page.group")
const fees = require("./page.fees")

const pageServices = {
	dashboard,
	settings,
	account,
	groups,
	group,
	fees
}

module.exports = pageServices