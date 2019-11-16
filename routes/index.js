const express = require("express")
const appRouter = express.Router()

const authRouter = require("./auth.route")
const otpRouter = require("./otp.route")

appRouter.use("/auth", authRouter)
appRouter.use("/otp", otpRouter)

module.exports = appRouter