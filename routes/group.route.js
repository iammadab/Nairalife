const express = require("express")
const groupRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")

const groupService = require("../services/group")

groupRouter.post("/", bodyResponder(groupService.create))

module.exports = groupRouter