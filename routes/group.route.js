const express = require("express")
const groupRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")

const groupService = require("../services/group")
const authenticationService = require("../services/authentication")

groupRouter.post("/", authenticationService.verifyToken(), authenticationService.validateAdmin, bodyResponder(groupService.createGroup))

module.exports = groupRouter