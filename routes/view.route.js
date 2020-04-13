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
	res.render("index",{ title: "Nairalife Hire Purchase"})
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

viewRouter.get("/agreement", (req, res) => {
	res.render("agreement",{ title: "Nairalife HP Agreement"})
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
	res.render("profile",{ title: "Profile", ...req.body.pageData })
})

viewRouter.get("/business", cookieNotFound("/login"), verifyToken(), stageRouter("enter_business"), pageService.user, (req, res) => {
	res.render("business",{ title: "Business", ...req.body.pageData })
})


viewRouter.get("/docs", cookieNotFound("/login"), verifyToken(), stageRouter("add_proof"), pageService.user, (req, res) => {
	res.render("docs", { title: "Documents", ...req.body.pageData })
})


viewRouter.get("/car", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.cars, (req, res) => {
	res.render("car", { title: "Car Hire Purchase", link: "car", ...req.body.pageData })
})

viewRouter.get("/awaiting", cookieNotFound("/login"), verifyToken(), stageRouter("plan_approval"), (req, res) => {
	res.render("awaiting", { title: "Awaiting" })
})

viewRouter.get("/start", cookieNotFound("/login"), verifyToken(), stageRouter("start_plan"), pageService.user, (req, res) => {
	res.render("start", { title: "Start HP", ...req.body.pageData })
})


viewRouter.get("/residence", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.user, (req, res) => {
	res.render("residence", { title: "Place of Residence", link: "residence", ...req.body.pageData })
})

viewRouter.get("/guarantor", cookieNotFound("/login"), verifyToken(), stageRouter("add_guarantor"), pageService.user, (req, res) => {
	res.render("guarantor", { title: "Guarantor Information", ...req.body.pageData })
})



// User with header
viewRouter.get("/home", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.dashboard, (req, res) => {
	res.render("dashboard", { title: "Dashboard", link: "", ...req.body.pageData })
})


viewRouter.get("/cancel", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.user, (req, res) => {
	res.render("cancel", { title: "Cancel Agreement", link: "cancel", ...req.body.pageData })
})

viewRouter.get("/pay", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.user, (req, res) => {
	res.render("pay", { title: "Send Money", link: "Pay", ...req.body.pageData })
})

viewRouter.get("/transaction/:transaction_id", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.transaction, (req, res) => {
	res.render("transaction", { title: "Transaction #", link: "#", ...req.body.pageData })
})


viewRouter.get("/settings", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.settings, (req, res) => {
	res.render("settings", { title: "Account Settings", link: "settings", ...req.body.pageData })
})


viewRouter.get("/history", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.userTransaction, pageService.user, (req, res) => {
	res.render("history", { title: "Payment History", link: "history", ...req.body.pageData })
})

viewRouter.get("/card", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.user, (req, res) => {
	res.render("card", { title: "Add Your ATM Card", link: "Card",...req.body.pageData })
})


viewRouter.get("/loan", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.user, (req, res) => {
	res.render("loan", { title: "Instalment Loans", link: "loan",...req.body.pageData })
})


viewRouter.get("/requests", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.userTransaction, pageService.user, (req, res) => {
	res.render("requests", { title: "Loan Requests", link: "loans", ...req.body.pageData })
})


viewRouter.get("/request/:transaction_id", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.transaction, (req, res) => {
	res.render("request", { title: "Request #", link: "#", ...req.body.pageData })
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

viewRouter.get("/admin/payment/:transaction_id", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), pageService.transaction, (req, res) => {
	res.render("admin/payment", {title: "Transaction", link: "payment", ...req.body.pageData })
})

viewRouter.get("/admin/members", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), pageService.members, (req, res) => {
	res.render("admin/members", {title: "Nairalife Members", link: "members", ...req.body.pageData })
})

viewRouter.get("/admin/deduct", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), pageService.auto, (req, res) => {
	res.render("admin/deduct", {title: "Nairalife Deductions", link: "Manual", ...req.body.pageData })
})

viewRouter.get("/admin/profile/:user_id", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), pageService.profile, (req, res) => {
	res.render("admin/profile", { title: "Account Profile", link: "profile", ...req.body.pageData })
})



module.exports = viewRouter