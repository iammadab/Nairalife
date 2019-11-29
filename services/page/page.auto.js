const pageFunctions = require("./functions")

async function auto(req, res, next){
	let autoSaveMembers = await pageFunctions.fetchUsers({ status: "autosave" })
	let midnight = new Date((new Date()).setHours(0, 0, 0, 0))
	// console.log(midnight)

	for(let i = 0; i < autoSaveMembers.length; i++){
		let baseData = {
			user_id: autoSaveMembers[i].user_id,
			type: "autosave"
		}
		console.log(baseData)

		let successfulTransactions = await pageFunctions.fetchTransactions({ ...baseData, status: "success", created_at: { $gt: midnight }})
		let pendingTransactions = await pageFunctions.fetchTransactions({ ...baseData, status: "pending", created_at: { $gt: midnight }})
		let failedTransactions = await pageFunctions.fetchTransactions({ ...baseData, status: "failed", created_at: { $gt: midnight }})

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