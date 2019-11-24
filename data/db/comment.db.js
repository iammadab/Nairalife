const createDb = require("./base.db")
const commentModel = require("../models/comment.model")
const commentDb = createDb(commentModel)

module.exports = commentDb