const express = require("express")
const authRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")
const userService = require("../services/user")

authRouter.get("/", bodyResponder(userService.createUser))

module.exports = authRouter