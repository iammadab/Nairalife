const { createValidator } = require("lazy-validator")

const createCommentValidator = createValidator("username.string, comment.string, user_id.number, group_id.number")

const commentDb = require("../../data/db/comment.db")

async function createComment(data){
	let validationResult = createCommentValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let validData = validationResult.data

	let commentObj = await commentDb.createComment(validData)
	if(!commentObj)
		return { status: 500, code: "PROBLEM_CREATING_COMMENT" }

	return { status: 200, code: "COMMENT_CREATED", comment: commentObj._doc }
}

module.exports = createComment