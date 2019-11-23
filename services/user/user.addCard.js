const { createValidator } = require("lazy-validator")

const addCardValidator = createValidator("authorization.object")

const userDb = require("../../data/db/user.db")

async function addCard(data){
	let validationResult = addCardValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let userObj = await userDb.findOneWith({ _id: data.user.id })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	let cardDetails = { reference: data.reference, authorization: data.authorization }

	let userObjCopy = Object.assign({}, userObj._doc)
	userObjCopy.card[0] = cardDetails

	userObj = await userDb.appendDoc({ _id: data.user.id }, "card", userObjCopy.card)

	if(userObj)
		return { status: 200, code: "ADDED_CARD" }

	return { status: 500, code: "PROBLEM_ADDING_CARD" }
}

module.exports = addCard