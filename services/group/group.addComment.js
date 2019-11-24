const { createValidator } = require("lazy-validator")

const addCommentValidator = createValidator("comment.string, group_id.number")

const groupDb = require("../../data/db/group.db")
const userDb = require("../../data/db/user.db")

async function addComment(data){
	let validationResult = addCommentValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_CODE", errors: validationResult.errors }

	let validData = validationResult.data

	let groupObj = await groupDb.findOneWith({ group_id: validData.group_id })
	if(!groupObj)
		return { status: 403, code: "GROUP_DOES_NOT_EXIST" }

}

module.exports = addComment