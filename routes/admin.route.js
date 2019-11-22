const express = require("express")
const adminRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")

const adminService = require("../services/admin")

adminRouter.post("/login", bodyResponder(adminService.loginAdmin))

module.exports = adminRouter