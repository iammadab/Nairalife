const express = require("express")
const authRouter = express.Router()

const userService = require("../services/user")

authRouter.get("/", userService.createUser)

module.exports = authRouter