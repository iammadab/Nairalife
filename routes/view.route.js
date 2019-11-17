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

viewRouter.get("/account", cookieNotFound("/login"), verifyToken, stageRouter("enter_card_datails"), (req, res) => {
	res.render("account")
})

viewRouter.get("/home", cookieNotFound("/login"), verifyToken, stageRouter("active"), (req, res) => {
	res.render("dashboard", { title: "Dashboard", link: "" })
})

module.exports = viewRouter