const express = require("express")
const viewRouter = express.Router()

const { 
	cookieFound, 
	cookieNotFound,
	stageRouter,
	verifyToken
} = require("../services/authentication")

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

viewRouter.get("/home", cookieNotFound("/login"), verifyToken, stageRouter("active"), (req, res) => {
	res.render("dashboard", { title: "Dashboard", link: "" })
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