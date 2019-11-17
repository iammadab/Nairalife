const express = require("express")
const userRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")

const userService = require("../services/user")

userRouter.post("/exist", bodyResponder(userService.userExist))
userRouter.post("/preference", bodyResponder(userService.userPreference))

module.exports = userRouter