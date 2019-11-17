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

viewRouter.get("/register", cookieFound("/home"), (req, res) => {
	res.render("register")
})

viewRouter.get("/account", cookieNotFound("/login"), verifyToken, stageRouter("enter_card_details"), (req, res) => {
	res.render("account")
})

viewRouter.get("/about", cookieNotFound("/login"), verifyToken, stageRouter("enter_contribution_preference"), (req, res) => {
	res.render("about")
})

viewRouter.get("/home", cookieNotFound("/login"), verifyToken, stageRouter("active"), pageService.dashboard, (req, res) => {
	res.render("dashboard", { title: "Dashboard", link: "", user: req.body.pageData.user })
})

module.exports = viewRouter