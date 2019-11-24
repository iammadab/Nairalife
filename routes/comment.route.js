const express = require("express")
const commentRouter = express.Router()

const { bodyResponder } = require("./serviceAdapter")

const commentService = require("../services/comment")

commentRouter.post("/", bodyResponder(commentService.createComment))