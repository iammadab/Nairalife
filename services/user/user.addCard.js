const { createValidator } = require("lazy-validator")

const addCardValidator = createValidator("authorization.object")

const userDb = require("../../data/db/user.db")

async function addCard(data){
	let validationResult = addCardValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	// let userObj = await userDb.findOne({ _id: data.user.id })
	// if()
}

module.exports = addCard