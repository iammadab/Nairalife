const pageFunctions = require("./functions")

async function auto(req, res, next){
	let autoSaveMembers = await pageFunctions.fetchUsers({ status: "autosave" })
	let midnight = new Date((new Date()).setHours(0, 0, 0, 0))

	for(let i = 0; i < autoSaveMembers.length; i++){
		// Check if the user can save today
		if(autoSaveMembers[i].autosave_start){
			// Each user has a date that they started autosave
			// And they have a period that they have chosen to save
			// We need to check if today falls in that period
			// First we set an even playing field by setting today to midnight and setting the day they started to midnight 
			let autoSaveMidnight = (new Date(autoSaveMembers[i].autosave_start)).setHours(0, 0, 0, 0)
			
			// Next we get the amount of milliseconds that have passed since they started saving till today
			let datePassed = Number(midnight) - Number(autoSaveMidnight)

			// We convert that to a date and then extract the date
			// Since the new date will be at midnight, the date shifts by one
			// We fix this by subtracting one after getting the date
			let days = (new Date(datePassed)).getDate() - 1

			// This maps the contribution period to the days
			let periodMap = {
				daily: 1,
				weekly: 7,
				monthly: 30
			}

			// Here we get the contribution period value
			// Then check if the days passed fall under that period
			// If it does we continue to check transactions
			// If it doesn't we set the phase to success and continue as nothing should be done
			let periodCount = periodMap[autoSaveMembers[i]._doc.about.contribution_period]
			if(periodCount && days % periodCount != 0){
				autoSaveMembers[i]._doc.phase = "success"
				continue
			}
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