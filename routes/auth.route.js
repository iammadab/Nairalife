const express = require("express")
const authRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")

const userService = require("../services/user")

authRouter.post("/", bodyResponder(userService.createUser))
authRouter.post("/login", bodyResponder(userService.loginUser))

module.exports = authRouter