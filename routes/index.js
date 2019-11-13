const express = require("express")
const appRouter = express.Router()

const authRouter = require("./auth.route.js")

appRouter.use("/auth", authRouter)

module.exports = appRouter