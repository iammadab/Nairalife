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
	res.render("index",{ title: "Nairalife Savings Group"})
})

viewRouter.get("/aboutus", (req, res) => {
	res.render("aboutus",{ title: "About Nairalife"})
})

viewRouter.get("/contact", (req, res) => {
	res.render("contact",{ title: "Contact Us"})
})


viewRouter.get("/privacy", (req, res) => {
	res.render("privacy",{ title: "Privacy Policy"})
})

viewRouter.get("/terms", (req, res) => {
	res.render("terms",{ title: "Terms Of Service"})
})


viewRouter.get("/login", cookieFound("/home"), (req, res) => {
	res.render("login",{ title: "Nairalife Login"})
})

viewRouter.get("/forgot", cookieFound("/home"), (req, res) => {
	res.render("forgot",{ title: "Forgot Password"})
})

viewRouter.get("/register", cookieFound("/home"), (req, res) => {
	res.render("register",{ title: "Register on Nairalife"})
})

viewRouter.get("/account", cookieNotFound("/login"), verifyToken(), stageRouter("enter_account_details"), pageService.account, (req, res) => {
	res.render("account", { title: "Bank Account", banks: req.body.pageData.banks })
})

viewRouter.get("/about", cookieNotFound("/login"), verifyToken(), stageRouter("enter_contribution_preference"), (req, res) => {
	res.render("about",{ title: "Welcome"})
})

viewRouter.get("/fee", cookieNotFound("/login"), verifyToken(), stageRouter("enter_card_details"), pageService.fees, (req, res) => {
	res.render("fees",{ title: "Pay Fee", ...req.body.pageData })
})

viewRouter.get("/home", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.dashboard, (req, res) => {
	res.render("dashboard", { title: "Dashboard", link: "", ...req.body.pageData })
})


viewRouter.get("/higher", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.settings, (req, res) => {
	res.render("higher", { title: "Get Higher Purchase", link: "higher purchase", user: req.body.pageData.user._doc })
})

viewRouter.get("/auto", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.settings, (req, res) => {
	res.render("auto", { title: "Nairalife Autosave"})
})


viewRouter.get("/withdraw", cookieNotFound("/login"), verifyToken(), stageRouter("active"), (req, res) => {
	res.render("withdraw", { title: "Withdraw Money", link: "withdraw" })
})

viewRouter.get("/settings", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.settings, (req, res) => {
	res.render("settings", { title: "Account Settings", link: "settings", ...req.body.pageData })
})

viewRouter.get("/admin/login", cookieFound("/admin/dashboard", "atoken"), (req, res) => {
	res.render("admin/login")
})

viewRouter.get("/admin/dashboard", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), (req, res) => {
	res.render("admin/dashboard")
})

viewRouter.get("/admin/create", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), (req, res) => {
	res.render("admin/create")
})

viewRouter.get("/admin/groups", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), pageService.groups, (req, res) => {
	res.render("admin/groups", { ...req.body.pageData })
})

viewRouter.get("/admin/group/:group_id", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), pageService.group, (req, res) => {
	res.render("admin/group", { ...req.body.pageData })
})

viewRouter.get("/admin/change", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), (req, res) => {
	res.render("admin/change")
})

viewRouter.get("/admin/pay", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), (req, res) => {
	res.render("admin/pay")
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

viewRouter.get("/admin/group", (req, res) => {
	res.render("admin/group")
})

viewRouter.get("/admin/contributions", (req, res) => {
	res.render("admin/contributions")
})

viewRouter.get("/admin/add", (req, res) => {
	res.render("admin/add")
})

viewRouter.get("/admin/remove", (req, res) => {
	res.render("admin/remove")
})

module.exports = viewRouter