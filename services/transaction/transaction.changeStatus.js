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