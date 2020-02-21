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
	res.render("index",{ title: "Nairalife HP"})
})


viewRouter.get("/partner", (req, res) => {
	res.render("partner",{ title: "Partner With Nairalife"})
})


viewRouter.get("/about", (req, res) => {
	res.render("about",{ title: "About Nairalife"})
})

viewRouter.get("/contact", (req, res) => {
	res.render("contact",{ title: "Contact Nairalife"})
})


viewRouter.get("/privacy", (req, res) => {
	res.render("privacy",{ title: "Privacy Policy"})
})

viewRouter.get("/terms", (req, res) => {
	res.render("terms",{ title: "Terms Of Service"})
})







// User routes
viewRouter.get("/login", cookieFound("/home"), (req, res) => {
	res.render("login",{ title: "Login"})
})

viewRouter.get("/forgot", cookieFound("/home"), (req, res) => {
	res.render("forgot",{ title: "Forgot Password"})
})

viewRouter.get("/register", cookieFound("/home"), (req, res) => {
	res.render("register",{ title: "Register"})
})

viewRouter.get("/account", cookieNotFound("/login"), verifyToken(), stageRouter("enter_account_details"), pageService.account, (req, res) => {
	res.render("account", { title: "Bank Account", banks: req.body.pageData.banks })
})

viewRouter.get("/profile", cookieNotFound("/login"), verifyToken(), stageRouter("enter_info"), pageService.user, (req, res) => {
	res.render("profile",{ title: "Add Profile", ...req.body.pageData })
})


viewRouter.get("/plan", cookieNotFound("/login"), verifyToken(), stageRouter("choose_plan"), (req, res) => {
	res.render("plan", { title: "Choose Plan"})
})

viewRouter.get("/awaiting", cookieNotFound("/login"), verifyToken(), stageRouter("plan_approval"), (req, res) => {
	res.render("awaiting", { title: "Awaiting" })
})

viewRouter.get("/start", cookieNotFound("/login"), verifyToken(), stageRouter("start_plan"), pageService.user, (req, res) => {
	res.render("start", { title: "Start HP Plan", ...req.body.pageData })
})


viewRouter.get("/residence", cookieNotFound("/login"), verifyToken(), stageRouter("add_house"), pageService.user, (req, res) => {
	res.render("residence", { title: "Place of Residence", ...req.body.pageData })
})

viewRouter.get("/guarantor", cookieNotFound("/login"), verifyToken(), stageRouter("add_guarantor"), pageService.user, (req, res) => {
	res.render("guarantor", { title: "Guarantor Information", ...req.body.pageData })
})


viewRouter.get("/docs", cookieNotFound("/login"), verifyToken(), stageRouter("add_proof"), pageService.user, (req, res) => {
	res.render("docs", { title: "Send Documents", ...req.body.pageData })
})


// User with header
viewRouter.get("/home", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.dashboard, (req, res) => {
	res.render("dashboard", { title: "Dashboard", link: "", ...req.body.pageData })
})


viewRouter.get("/cancel", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.user, (req, res) => {
	res.render("cancel", { title: "Cancel HP Agreement", link: "cancel", ...req.body.pageData })
})

viewRouter.get("/pay", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.user, (req, res) => {
	res.render("pay", { title: "Make Payment", link: "pay", ...req.body.pageData })
})

viewRouter.get("/transaction", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.user, (req, res) => {
	res.render("transaction", { title: "#1266362", link: "transaction", ...req.body.pageData })
})


viewRouter.get("/settings", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.settings, (req, res) => {
	res.render("settings", { title: "Account Settings", link: "settings", ...req.body.pageData })
})


viewRouter.get("/history", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.userTransaction, pageService.user, (req, res) => {
	res.render("history", { title: "Payment History", link: "history", ...req.body.pageData })
})






// Admin routes
viewRouter.get("/admin/login", cookieFound("/admin/dashboard", "atoken"), (req, res) => {
	res.render("admin/login",{ title: "Admin Login"})
})

viewRouter.get("/admin/dashboard", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), pageService.stat, (req, res) => {
	res.render("admin/dashboard",{ title: "Administrator", link: "", ...req.body.pageData })
})

viewRouter.get("/admin/payments", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), pageService.transactions, (req, res) => {
	res.render("admin/payments", {title: "Nairalife Payments", link: "payments", ...req.body.pageData })
})

viewRouter.get("/admin/payment", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), pageService.transactions, (req, res) => {
	res.render("admin/payment", {title: "#191826552", link: "payment", ...req.body.pageData })
})

viewRouter.get("/admin/members", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), pageService.members, (req, res) => {
	res.render("admin/members", {title: "Nairalife Members", link: "members", ...req.body.pageData })
})

viewRouter.get("/admin/deduct", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), pageService.auto, (req, res) => {
	res.render("admin/auto", {title: "Nairalife Deductions", link: "Manual", ...req.body.pageData })
})

viewRouter.get("/admin/profile/:user_id", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), pageService.profile, (req, res) => {
	res.render("admin/profile", { title: "Account Profile", link: "profile", ...req.body.pageData })
})



module.exports = viewRouter