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

viewRouter.get("/account", cookieNotFound("/login"), verifyToken, stageRouter("enter_account_details"), pageService.account, (req, res) => {
	res.render("account", { banks: req.body.pageData.banks })
})

viewRouter.get("/about", cookieNotFound("/login"), verifyToken, stageRouter("enter_contribution_preference"), (req, res) => {
	res.render("about")
})

viewRouter.get("/fee", cookieNotFound("/login"), verifyToken, stageRouter("enter_card_details"), (req, res) => {
	res.render("fees")
})

viewRouter.get("/home", cookieNotFound("/login"), verifyToken, stageRouter("active"), pageService.dashboard, (req, res) => {
	res.render("dashboard", { title: "Dashboard", link: "", user: req.body.pageData.user })
})

viewRouter.get("/settings", cookieNotFound("/login"), verifyToken, stageRouter("active"), pageService.settings, (req, res) => {
	res.render("settings", { title: "Settings", link: "settings", user: req.body.pageData.user._doc })
})

viewRouter.get("/admin/login", (req, res) => {
	res.render("admin/login")
})

viewRouter.get("/admin/dashboard", (req, res) => {
	res.render("admin/dashboard")
})

viewRouter.get("/admin/members", (req, res) => {
	res.render("admin/members")
})

module.exports = viewRouter