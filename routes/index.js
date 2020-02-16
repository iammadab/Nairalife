const express = require("express")
const appRouter = express.Router()

const authRouter = require("./auth.route")
const otpRouter = require("./otp.route")
const userRouter = require("./user.route")
const bankRouter = require("./bank.route")
const cardRouter = require("./card.route")
const bvnRouter = require("./bvn.route")
const adminRouter = require("./admin.route")
const groupRouter = require("./group.route")
const webhookRouter = require("./webhook.route")
const paymentRouter = require("./payment.route")
const transactionRouter = require("./transaction.route")

appRouter.use("/auth", authRouter)
appRouter.use("/otp", otpRouter)
appRouter.use("/user", userRouter)
appRouter.use("/bank", bankRouter)
appRouter.use("/card", cardRouter)
appRouter.use("/bvn", bvnRouter)
appRouter.use("/admin", adminRouter)
appRouter.use("/group", groupRouter)
appRouter.use("/webhook", webhookRouter)
appRouter.use("/payment", paymentRouter)
appRouter.use("/transaction", transactionRouter)

module.exports = appRouter