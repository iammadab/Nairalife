const { createValidator } = require("lazy-validator")

const saveValidator = createValidator("user_id.number")

const userDb = require("../../data/db/user.db")
const transactionDb = require("../../data/db/transaction.db")

const paymentService = require("../payment")

async function save(data){
	let validationResult = saveValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let validData = validationResult.data

	let adminObj = await userDb.findOneWith({ _id: data.user.id })
	if(!adminObj)
		return { status: 403, code: "UNAUTHORIZED" }

	let userObj = await userDb.findOneWith({ user_id: validData.user_id })
	if(!userObj)
		return { status: 403, code: "USER_NOT_FOUND" }

	if(userObj.status != "autosave")
		return { status: 403, code: "USER_NOT_IN_AUTOSAVE" }

	// A user only autosaves once per day, so when autosave is initiated,
	// Get all the transactions of that user since midnight
	// If there is any successful or pending, send error that the transaction has already started
	let midnight = new Date((new Date()).setHours(0, 0, 0, 0))
	let baseData = { user_id: userObj.user_id, type: "autosave" }
	let successfulTransactions = await transactionDb.findWith({ ...baseData, status: "success", created_at: { $gte: midnight }})
	let pendingTransactions = await transactionDb.findWith({ ...baseData, status: "pending", created_at: { $gte: midnight }})

	if(successfulTransactions.length > 0 || pendingTransactions.length > 0)
		return { status: 403, code: "TRANSACTION_ALREADY_STARTED" }




	let contributionAmount = userObj._doc.about.contribution_make
	

	// Charge the user based on the amount they said they want to contribute
	let chargeResult = await paymentService.charge({
		user_id: validData.user_id,
		amount: contributionAmount
	})


	// The transaction object for the user
	// The webhook will be the one to update the transactions based on the reference
	let userTransaction = await transactionDb.createTransaction({
		username: userObj.fullname,
		user_id: userObj.user_id,
		amount: contributionAmount,
		reference: chargeResult.data.reference,
		type: "autosave",
		status: "pending",
		data: {
			admin: adminObj.fullname,
			admin_id: adminObj.user_id
		}
	})	

	return { status: 200, code: "AUTOSAVE_SUCCESSFUL" }
	
}

module.exports = save