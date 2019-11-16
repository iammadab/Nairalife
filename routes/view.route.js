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

module.exports = viewRouter