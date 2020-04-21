const express = require("express")
const userRouter = express.Router()

const { bodyResponder, reqResponder } = require("./serviceAdapter")

const userService = require("../services/user")
const paymentService = require("../services/payment")
const authenticationService = require("../services/authentication")

userRouter.post("/exist", bodyResponder(userService.userExist))
userRouter.post("/preference", authenticationService.verifyToken(), bodyResponder(userService.userPreference))
userRouter.post("/business", authenticationService.verifyToken(), bodyResponder(userService.userBusiness))
userRouter.post("/plan", authenticationService.verifyToken(), bodyResponder(userService.userPlan))
userRouter.post("/profile", authenticationService.verifyToken(), bodyResponder(userService.updateProfile))
userRouter.post("/password", authenticationService.verifyToken(), bodyResponder(userService.changePassword))
userRouter.post("/password/forgot", bodyResponder(userService.forgotPassword))
userRouter.post("/withdraw", authenticationService.verifyToken(), bodyResponder(paymentService.withdraw))
userRouter.post("/save", authenticationService.verifyToken(), authenticationService.validateAdmin, bodyResponder(userService.save))
userRouter.post("/house", authenticationService.verifyToken(), bodyResponder(userService.addHouse))
userRouter.post("/guarantor", authenticationService.verifyToken(), bodyResponder(userService.addGuarantor))
userRouter.post("/car", authenticationService.verifyToken(), bodyResponder(userService.selectCar))

module.exports = userRouter