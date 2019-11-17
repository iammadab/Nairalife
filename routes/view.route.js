const express = require("express")
const viewRouter = express.Router()

const { cookieFound, cookieNotFound } = require("../services/authentication")

viewRouter.get("/", cookieFound("/home"), (req, res) => {
	res.render("index")
})

viewRouter.get("/login", cookieFound("/home"), (req, res) => {
	res.render("login")
})

viewRouter.get("/register", cookieFound("/home"), (req, res) => {
	res.render("register")
})

viewRouter.get("/account", (req, res) => {
	res.render("account")
})

viewRouter.get("/home", (req, res) => {
	res.render("dashboard", { title: "Dashboard", link: "" })
})

module.exports = viewRouter