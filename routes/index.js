const express = require("express")
const appRouter = express.Router()

const authRouter = require("./auth.route.js")
console.log(authRouter)

appRouter.use("/auth", authRouter)

module.exports = appRouter