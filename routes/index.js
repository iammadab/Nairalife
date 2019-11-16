const express = require("express")
const appRouter = express.Router()

const authRouter = require("./auth.route")
const otpRouter = require("./otp.route")
const userRouter = require("./user.route")

appRouter.use("/auth", authRouter)
appRouter.use("/otp", otpRouter)
appRouter.use("/user", userRouter)

module.exports = appRouter