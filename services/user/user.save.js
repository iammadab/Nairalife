const { createValidator } = require("lazy-validator")

const saveValidator = createValidator("user_id.number")

const userDb = require("../../data/db/user.db")

const paymentService = require("../payment")

async function save(data){
	let validationResult = saveValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let validData = validationResult.data

	let userObj = await userDb.findOneWith({ user_id: validData.user_id })
	if(!userObj)
		return { status: 403, code: "USER_NOT_FOUND" }

	if(userObj.status != "autosave")
		return { status: 403, code: "USER_NOT_IN_AUTOSAVE" }

	let contributionAmount = userObj._doc.about.contribution_make
	

	// Charge the user based on the amount they said they want to contribute
	let chargeResult = await paymentService.charge({
		user_id: validData.user_id,
		amount: contributionAmount
	})

	console.log(chargeResult)



}

module.exports = save