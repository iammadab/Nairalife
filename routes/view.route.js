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
	res.render("index",{ title: "Nairalife"})
})


// viewRouter.get("/partner", (req, res) => {
// 	res.render("partner",{ title: "Partner With Nairalife"})
// })


viewRouter.get("/about", (req, res) => {
	res.render("about",{ title: "About Us"})
})

viewRouter.get("/contact", (req, res) => {
	res.render("contact",{ title: "Contact Us"})
})

viewRouter.get("/faq", (req, res) => {
	res.render("faq",{ title: "FAQ"})
})

viewRouter.get("/how", (req, res) => {
	res.render("how",{ title: "How It Works"})
})


viewRouter.get("/privacy", (req, res) => {
	res.render("privacy",{ title: "Privacy Policy"})
})

viewRouter.get("/terms", (req, res) => {
	res.render("terms",{ title: "Terms Of Service"})
})

// viewRouter.get("/agreement", (req, res) => {
// 	res.render("agreement",{ title: "Nairalife HP Agreement"})
// })






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


viewRouter.get("/profile", cookieNotFound("/login"), verifyToken(), stageRouter("enter_info"), pageService.user, (req, res) => {
	res.render("profile",{ title: "Profile", ...req.body.pageData })
})

viewRouter.get("/business", cookieNotFound("/login"), verifyToken(), stageRouter("enter_business"), pageService.user, (req, res) => {
	res.render("business",{ title: "Business", ...req.body.pageData })
})


viewRouter.get("/verification", cookieNotFound("/login"), verifyToken(), stageRouter("add_proof"), pageService.user, (req, res) => {
	res.render("verification", { title: "Account Verification", ...req.body.pageData })
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


viewRouter.get("/account", cookieNotFound("/login"), verifyToken(), stageRouter("enter_account_details"), pageService.account, (req, res) => {
	res.render("account", { title: "Bank Account", link: "account", banks: req.body.pageData.banks })
})

viewRouter.get("/residence", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.user, (req, res) => {
	res.render("residence", { title: "Place of Residence", link: "residence", ...req.body.pageData })
})

viewRouter.get("/guarantor", cookieNotFound("/login"), verifyToken(), stageRouter("add_guarantor"), pageService.user, (req, res) => {
	res.render("guarantor", { title: "Guarantor Information", ...req.body.pageData })
})


// User with header
viewRouter.get("/home", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.dashboard, (req, res) => {
	res.render("dashboard", { title: "Home", link: "", ...req.body.pageData })
})


viewRouter.get("/help", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.dashboard, (req, res) => {
	res.render("help", { title: "Helpful Resources", link: "Questions & Answers", ...req.body.pageData })
})


viewRouter.get("/cancel", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.user, (req, res) => {
	res.render("cancel", { title: "Cancel Agreement", link: "cancel", ...req.body.pageData })
})

viewRouter.get("/pay", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.user, (req, res) => {
	res.render("pay", { title: "Pay Nairalife", link: "Pay", ...req.body.pageData })
})

viewRouter.get("/payment/:transaction_id", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.transaction, (req, res) => {
	res.render("transaction", { title: `#${req.body.pageData.transaction.reference}`, link: "Payment Details", ...req.body.pageData })
})


viewRouter.get("/settings", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.settings, (req, res) => {
	res.render("settings", { title: "Account Settings", link: "Settings", ...req.body.pageData })
})


viewRouter.get("/payments", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.userTransaction, pageService.user, (req, res) => {
	res.render("history", { title: "Payment History", link: "Payments", ...req.body.pageData })
})

viewRouter.get("/card", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.user, (req, res) => {
	res.render("card", { title: "Add Card", link: "Card",...req.body.pageData })
})


viewRouter.get("/loan", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.user, pageService.loan)


viewRouter.get("/loans", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.loans, pageService.user, (req, res) => {
	res.render("requests", { title: "Loan History", link: "Loans", ...req.body.pageData })
})


viewRouter.get("/loan/:loan_id", cookieNotFound("/login"), verifyToken(), stageRouter("active"), pageService.eachLoan, (req, res) => {
	res.render("request", { title: `#${req.body.pageData.loan.reference}`, link: "Loan Details", ...req.body.pageData })
})



// Admin routes
viewRouter.get("/admin/login", cookieFound("/admin/dashboard", "atoken"), (req, res) => {
	res.render("admin/login",{ title: "Admin Login"})
})

viewRouter.get("/admin/dashboard", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), pageService.stat, (req, res) => {
	res.render("admin/dashboard",{ title: "Administrator", link: "", ...req.body.pageData })
})

viewRouter.get("/admin/payments", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), pageService.transactions, (req, res) => {
	res.render("admin/payments", {title: "Nairalife Payments", link: "Payments", ...req.body.pageData })
})

viewRouter.get("/admin/payment/:transaction_id", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), pageService.transaction, (req, res) => {
	res.render("admin/payment", {title: `#${req.body.pageData.transaction.reference}`, link: `#${req.body.pageData.transaction.reference}`, ...req.body.pageData })
})

viewRouter.get("/admin/loans", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), pageService.allLoans, (req, res) => {
	res.render("admin/loans", {title: "Nairalife Instalment Loans", link: "loans", ...req.body.pageData })
})

viewRouter.get("/admin/loan/:loan_id", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), pageService.eachLoan, (req, res) => {
	res.render("admin/loan", {title: `Loan #${req.body.pageData.loan.reference}`, link: `#${req.body.pageData.loan.reference}`, ...req.body.pageData })
})

viewRouter.get("/admin/members", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), pageService.members, (req, res) => {
	res.render("admin/members", {title: "Nairalife Members", link: "members", ...req.body.pageData })
})

viewRouter.get("/admin/deduct", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), pageService.auto, (req, res) => {
	res.render("admin/deduct", {title: "Nairalife Deductions", link: "Manual", ...req.body.pageData })
})

viewRouter.get("/admin/deduct/loans", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), pageService.chargeLoans, (req, res) => {
	res.render("admin/deductloans", { title: "Nairalife Deductions", link: "Manual", ...req.body.pageData })
})

viewRouter.get("/admin/profile/:user_id", cookieNotFound("/admin/login", "atoken"), verifyToken("atoken"), pageService.profile, (req, res) => {
	res.render("admin/profile", { title: `${req.body.pageData.user.fullname}`, link: "profile", ...req.body.pageData })
})



module.exports = viewRouter