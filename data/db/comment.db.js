const createDb = require("./base.db")
const commentModel = require("../models/comment.model")
const commentDb = createDb(commentModel)

commentDb.createComment = function({ fullname, comment, user_id, group_id }){
	let newComment = new commentModel({
		fullname,
		comment,
		user_id,
		group_id
	})

	return newComment.save()
}

module.exports = commentDb