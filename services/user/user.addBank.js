const { createValidator } = require("lazy-validator")

// const addBankValidator = createValidator("accountResult.object, bvnResult.object, user.object")
const addBankValidator = createValidator("user.object")

const userDb = require("../../data/db/user.db")

async function addBank(data){
	let validationResult = addBankValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let userObj = await userDb.findOneWith({ _id: data.user.id })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	let bankDetails = { account: { ...data.accountResult, bank_code: data.bank_code }, bvn: data.bvnResult }

	let userObjCopy = Object.assign({}, userObj._doc)
	userObjCopy.bank[0] = bankDetails
	
	userObj = await userDb.appendDoc({ _id: data.user.id }, "bank", userObjCopy.bank)

	if(userObj)
		return { status: 200, code: "ADDED_BANK" }

	return { satus: 500, code: "PROBLEM_ADDING_BANK" }
}

module.exports = addBank