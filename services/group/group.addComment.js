const { createValidator } = require("lazy-validator")

const addCommentValidator = createValidator("comment.string, group_id.number")

const groupDb = require("../../data/db/group.db")
const userDb = require("../../data/db/user.db")

const commentService = require("../comment")

async function addComment(data){
	let validationResult = addCommentValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_CODE", errors: validationResult.errors }

	let validData = validationResult.data

	let groupObj = await groupDb.findOneWith({ group_id: validData.group_id })
	if(!groupObj)
		return { status: 403, code: "GROUP_DOES_NOT_EXIST" }

	let userObj = await userDb.findOneWith({ _id: data.user.id })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	if(userObj.group != validData.group_id)
		return { status: 403, code: "USER_NOT_IN_GROUP" }

	let createCommentResult = commentService.createComment({
		username: userObj.fullname,
		comment: validData.comment,
		user_id: userObj.user_id,
		group_id: userObj.group_id
	})

	if(createCommentResult.status != 200)
		return createCommentResult

	

}

module.exports = addComment