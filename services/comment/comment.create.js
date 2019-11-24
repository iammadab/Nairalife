const { createValidator } = require("lazy-validator")

const createCommentValidator = createValidator("username.string, comment.string, user_id.number, group_id.number")

async function createComment(data){
	let validationResult = createCommentValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }
}

module.exports = createComment