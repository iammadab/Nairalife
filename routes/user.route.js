const express = require("express")
const userRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")

const userService = require("../services/user")
const paymentService = require("../services/payment")
const authenticationService = require("../services/authentication")

userRouter.post("/exist", bodyResponder(userService.userExist))
userRouter.post("/preference", authenticationService.verifyToken(), bodyResponder(userService.userPreference))
userRouter.post("/profile", authenticationService.verifyToken(), bodyResponder(userService.updateProfile))
userRouter.post("/password", authenticationService.verifyToken(), bodyResponder(userService.changePassword))
userRouter.post("/password/forgot", bodyResponder(userService.forgotPassword))
userRouter.post("/withdraw", authenticationService.verifyToken(), bodyResponder(paymentService.withdraw))
userRouter.post("/points", authenticationService.verifyToken(), authenticationService.validateAdmin, bodyResponder(userService.addPoints))
userRouter.post("/balance", authenticationService.verifyToken(), authenticationService.validateAdmin, bodyResponder(userService.addBalance))
userRouter.post("/autosave/start", authenticationService.verifyToken(), bodyResponder(userService.startAutosave))
userRouter.post("/save", bodyResponder(userService.save))

module.exports = userRouter