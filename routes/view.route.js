const express = require("express")
const viewRouter = express.Router()

viewRouter.get("/", (req, res) => {
	res.render("index")
})

viewRouter.get("/login", (req, res) => {
	res.render("login")
})

viewRouter.get("/register", (req, res) => {
	res.render("register")
})

viewRouter.get("/account", (req, res) => {
	res.render("account")
})

viewRouter.get("/home", (req, res) => {
	res.render("dashboard", { title: "Dashboard", link: "" })
})

module.exports = viewRouter