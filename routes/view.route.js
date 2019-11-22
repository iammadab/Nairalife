const express = require("express")
const viewRouter = express.Router()

const { 
	cookieFound, 
	cookieNotFound,
	stageRouter,
	verifyToken
} = require("../services/authentication")

const pageService = require("../services/page")

viewRouter.get("/", cookieFound("/home"), (req, res) => {
	res.render("index")
})

viewRouter.get("/login", cookieFound("/home"), (req, res) => {
	res.render("login")
})

viewRouter.get("/forgot", cookieFound("/home"), (req, res) => {
	res.render("forgot")
})

viewRouter.get("/register", cookieFound("/home"), (req, res) => {
	res.render("register")
})

viewRouter.get("/account", cookieNotFound("/login"), verifyToken(), stageRouter("enter_account_details"), pageService.account, (req, res) => {
	res.render("account", { banks: req.body.pageData.banks })
})

viewRouter.get("/about", cookieNotFound("/login"), verifyToken(), stageRouter("enter_contribution_preference"), (req, res) => {
	res.render("about")
})

viewRouter.get("/fee", cookieNotFound("/login"), verifyToken(), stageRouter("enter_card_details"), (req, res) => {
	res.render("fees")
})

viewRouter.get("/home", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.dashboard, (req, res) => {
	res.render("dashboard", { title: "Dashboard", link: "", ...req.body.pageData })
})

viewRouter.get("/withdraw", cookieNotFound("/login"), verifyToken(), stageRouter("active"), (req, res) => {
	res.render("withdraw", { title: "Withdraw", link: "withdraw" })
})

viewRouter.get("/settings", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.settings, (req, res) => {
	res.render("settings", { title: "Settings", link: "settings", ...req.body.pageData })
})

viewRouter.get("/admin/login", cookieFound("/admin/dashboard", "atoken"), (req, res) => {
	res.render("admin/login")
})

viewRouter.get("/admin/dashboard", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), (req, res) => {
	res.render("admin/dashboard")
})

viewRouter.get("/admin/members", (req, res) => {
	res.render("admin/members")
})

viewRouter.get("/admin/auto", (req, res) => {
	res.render("admin/auto")
})

viewRouter.get("/admin/profile", (req, res) => {
	res.render("admin/profile")
})
	

viewRouter.get("/admin/transactions", (req, res) => {
	res.render("admin/transactions")
})


viewRouter.get("/admin/withdrawals", (req, res) => {
	res.render("admin/withdrawals")
})

viewRouter.get("/admin/points", (req, res) => {
	res.render("admin/points")
})


viewRouter.get("/admin/groups", (req, res) => {
	res.render("admin/groups")
})

viewRouter.get("/admin/group", (req, res) => {
	res.render("admin/group")
})

viewRouter.get("/admin/contributions", (req, res) => {
	res.render("admin/contributions")
})

viewRouter.get("/admin/create", (req, res) => {
	res.render("admin/create")
})

viewRouter.get("/admin/change", (req, res) => {
	res.render("admin/change")
})

viewRouter.get("/admin/add", (req, res) => {
	res.render("admin/add")
})

viewRouter.get("/admin/remove", (req, res) => {
	res.render("admin/remove")
})

viewRouter.get("/admin/pay", (req, res) => {
	res.render("admin/pay")
})

module.exports = viewRouter