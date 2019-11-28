const pageFunctions = require("./functions")

async function auto(req, res, next){
	let autoSaveMembers = await pageFunctions.fetchUsers({ status: "autosave" })
	let midnight = new Date((new Date()).setHours(0, 0, 0, 0))
	// console.log(midnight)

	for(let i = 0; i < autoSaveMembers.length; i++){
		let baseData = {
			user_id: autoSaveMembers.user_id,
			type: "autosave"
		}

		let successfulTransactions = await pageFunctions.fetchTransactions({ ...baseData, status: "success" })
		let pendingTransactions = await pageFunctions.fetchTransactions({ ...baseData, status: "pending" })
		let failedTransactions = await pageFunctions.fetchTransactions({ ...baseData, status: "failed" })

		console.log(successfulTransactions)
		console.log("")
		console.log(pendingTransactions)
		console.log("")
		console.log(failedTransactions)
		console.log("")

	}

	req.body.pageData = {
		autoSaveMembers
	}

	next()
}

module.exports = auto