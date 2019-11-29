const pageFunctions = require("./functions")

async function auto(req, res, next){
	let autoSaveMembers = await pageFunctions.fetchUsers({ status: "autosave" })
	let midnight = new Date((new Date()).setHours(0, 0, 0, 0))

	for(let i = 0; i < autoSaveMembers.length; i++){
		// Check if the user can save today
		if(autoSaveMembers[i].autosave_start){
			let autoSaveMidnight = (new Date(autosave_start)).setHours(0, 0, 0, 0)
			let datePassed = Number(midnight) - Number(autoSaveMidnight)
			console.log(daysPassed)
			let days = (new Date(daysPassed)).getDate()
			console.log("Days", daysPassed)
		}



		let baseData = {
			user_id: autoSaveMembers[i].user_id,
			type: "autosave"
		}

		let successfulTransactions = await pageFunctions.fetchTransactions({ ...baseData, status: "success", created_at: { $gte: midnight }})
		let pendingTransactions = await pageFunctions.fetchTransactions({ ...baseData, status: "pending", created_at: { $gte: midnight }})
		let failedTransactions = await pageFunctions.fetchTransactions({ ...baseData, status: "failed", created_at: { $gte: midnight }})

		if(successfulTransactions.length > 0)
			autoSaveMembers[i]._doc.phase = "success"
		else if(pendingTransactions.length > 0)
			autoSaveMembers[i]._doc.phase = "pending"
		else if(failedTransactions.length > 0)
			autoSaveMembers[i]._doc.phase = "failed"
		else
			autoSaveMembers[i]._doc.phase = "noattempt"
	}

	req.body.pageData = {
		autoSaveMembers
	}

	next()
}

module.exports = auto