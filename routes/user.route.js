const express = require("express")
const userRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")

const userService = require("../services/user")
const authenticationService = require("../services/authentication")

userRouter.post("/exist", bodyResponder(userService.userExist))
userRouter.post("/preference", authenticationService.verifyToken, bodyResponder(userService.userPreference))

module.exports = userRouter