const { createValidator } = require("lazy-validator")

const addCommentValidator = createValidator("comment.string, group_id.number")

async function addComment(data){
	let validationResult = addCommentValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_CODE", errors: validationResult.errors }
}

module.exports = addComment