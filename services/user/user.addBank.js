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

	// I wanted to be able to send either just the account details, the bvn details or both
	// The program should only update the new thing I send
	// So first I had to check if there is any old data
	// If there is, I get them for update
	let hasOld = userObj.bank.length > 0, accountObj = {}, bvnObj = {}
	if(hasOld){
		accountObj = userObj.bank[0].account
		bvnObj = userObj.bank[0].bvn
	}
	// Here, I check for the one I was given, then updated the old or empty data with what I was given
	if(data.accountResult){
		accountObj = { ...data.accountResult, bank_code: data.bank_code }
	}
	if(data.bvnResult){
		bvnObj = data.bvnResult
	}

	// So at this point, I should have the updated version of the account and bvn then I save :)
	let bankDetails = { account: accountObj, bvn: bvnObj }

	// Append the new banks, as opposed to replacing the old bank
	let userObjCopy = Object.assign({}, userObj._doc)
	userObjCopy.bank.unshift(bankDetails)
	
	userObj = await userDb.appendDoc({ _id: data.user.id }, "bank", userObjCopy.bank)

	if(userObj)
		return { status: 200, code: "ADDED_BANK" }

	return { satus: 500, code: "PROBLEM_ADDING_BANK" }
}

module.exports = addBank