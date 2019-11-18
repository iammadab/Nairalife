const express = require("express")
const userRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")

const userService = require("../services/user")
const authenticationService = require("../services/authentication")

userRouter.post("/exist", bodyResponder(userService.userExist))
userRouter.post("/preference", authenticationService.verifyToken, bodyResponder(userService.userPreference))
userRouter.post("/profile", authenticationService.verifyToken, bodyResponder(userService.updateProfile))
userRouter.post("/password", bodyResponder(userService.changePassword))

module.exports = userRouter