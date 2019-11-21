const express = require("express")
const appRouter = express.Router()

const authRouter = require("./auth.route")
const otpRouter = require("./otp.route")
const userRouter = require("./user.route")
const bankRouter = require("./bank.route")
const cardRouter = require("./card.route")
const bvnRouter = require("./bvn.route")

appRouter.use("/auth", authRouter)
appRouter.use("/otp", otpRouter)
appRouter.use("/user", userRouter)
appRouter.use("/bank", bankRouter)
appRouter.use("/card", cardRouter)
appRouter.use("/bvn", bvnRouter)

module.exports = appRouter