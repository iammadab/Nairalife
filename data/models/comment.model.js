const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({

})

const commentModel = mongoose.model("Comment", commentSchema)

module.exports = commentModel