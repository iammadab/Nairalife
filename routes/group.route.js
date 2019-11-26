const express = require("express")
const groupRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")

const groupService = require("../services/group")
const authenticationService = require("../services/authentication")

groupRouter.post("/", authenticationService.verifyToken(), authenticationService.validateAdmin, bodyResponder(groupService.createGroup))
groupRouter.post("/member", authenticationService.verifyToken(), authenticationService.validateAdmin, bodyResponder(groupService.addMember))
groupRouter.post("/member/remove", authenticationService.verifyToken(), authenticationService.validateAdmin, bodyResponder(groupService.removeMember))
groupRouter.post("/comment", authenticationService.verifyToken(), bodyResponder(groupService.addComment))
groupRouter.post("/start", authenticationService.verifyToken(), authenticationService.validateAdmin, bodyResponder(groupService.startGroup))
groupRouter.post("/cycle", authenticationService.verifyToken(), authenticationService.validateAdmin, bodyResponder(groupService.newCycle))
groupRouter.post("/contributions/charge", authenticationService.verifyToken(), authenticationService.validateAdmin, bodyResponser(groupService.getContributions))

module.exports = groupRouter