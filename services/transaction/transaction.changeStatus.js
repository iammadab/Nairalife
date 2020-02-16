const { createValidator } = require("lazy-validator")

const changeStatusValidator = createValidator("id.string, status.string.lowercase")

const transactionDb = require("../../data/db/transaction.db")

async function changeStatus(data){
	let validationResult = changeStatusValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let { id, status } = validationResult.data

	let transactionUnique = await transactionExists(id)
	if(transactionUnique.status != 200)
		return transactionUnique


	let transactionObj = transactionUnique.transaction
	// This function behaves differently based on the data passed to it
	// When an admin calls this function, we don't check to make sure they own the transaction
	// If its not an admin, we make sure that the user owns the transaction they are trying to decline
	
	// if the "owner" field is set to true, it signifies that the initator is not an admin
	if(data.owner){
		if(!data.owner_id)
			return { status: 403, code: "NO_OWNER_ID" }

		if(transactionObj.user_id != data.owner_id)
			return { status: 403, code: "INVALID_OWNER" }
	}


	// Only manual transactions can have their status changed
	if(transactionObj.data.type != "manual")
		return { status: 403, code: "NOT_MANUAL_TRANSACTION" }


	// If we get here, then all is good :)
	transactionObj = await transactionDb.appendDoc({ _id: id }, "status", status)
	if(transactionObj)
		return { status: 200, code: "TRANSACTION_UPDATED" }

	return { status: 500, code: "PROBLEM_UPDATING_TRANSACTION" }
}

module.exports = changeStatus

async function transactionExists(id){
	try{
		let transactionObj = await transactionDb.findOneWith({ _id: id })
		return { status: 200, transaction: transactionObj }
	} catch(e){
		return { status: 403, code: "TRANSACTION_DOES_NOT_EXIST" }
	}
}