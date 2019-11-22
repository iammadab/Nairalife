const express = require("express")
const userRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")

const groupService = require("../services/group")

module.exports = groupRouter