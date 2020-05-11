const pageFunctions = require("./functions")

async function auto(req, res, next){
	// This is the service that displays the active users in our higher purchase plan
	// In this service, we want to get the raw data for each user that we render
	// We also want to determine if the user has saved so we can display or not display the save button

	// First we fetch all the active users
	// Because some active users are not paying, we check if they are in payment one or two
	let higherPurchaseMembers = await pageFunctions.fetchUsers({ stage: "active", status: { $in: ["payment_one", "payment_two"] } })

	// Now I go through each member, calculate the amount they have paid and how much is remaining for rendering
	// This is also the section, that I determing if we should show the save button
	for(let i = 0; i < higherPurchaseMembers.length; i++){
		let member = higherPurchaseMembers[i]

		let midnight = new Date((new Date()).setHours(0, 0, 0, 0))
		let higherPurchaseTransactions = await pageFunctions.fetchTransactions({ user_id: member.user_id, type: "higher_purchase", status: "success"  })
		let totalPayment = 0

		higherPurchaseTransactions.forEach(transaction => {
			totalPayment += Number(transaction.amount)
		})

		member._doc.totalPayment = totalPayment
		member._doc.remainingPayment = member.plan.total_amount - totalPayment
		member._doc.lastDate = pageFunctions.createDate(
			higherPurchaseTransactions[0].created_at
		).getTime()

		// Now that rendering data has been collected, we need to determine if the user can save today
		// It's based on two factors, the payment plan chosen and the transactions that have already happened
		// Starting with the payment plan
		// First step is to get the plan the member is currently on
		let planObj = member.status == "payment_one" ? member.payment_one : member.plan

		if(planObj.start_date){
			// Each user has a date that they started payment
			// And they have a period that they have chosen to pay
			// We need to check if today falls in that period
			// First we set an even playing field by setting today to midnight and setting the day they started to midnight 
			let paymentStartMidnight = (new Date(planObj.start_date)).setHours(0, 0, 0, 0)
			
			// Next we get the amount of milliseconds that have passed since they started paying till today
			let datePassed = Number(midnight) - Number(paymentStartMidnight)

			// We convert that to a date and then extract the date
			// Since the new date will be at midnight, the date shifts by one
			// We fix this by subtracting one after getting the date
			let days = (new Date(datePassed)).getDate() - 1

			// This maps the payment period to the days
			let periodMap = {
				daily: 1,
				weekly: 7,
				monthly: 30
			}

			// Here we get the contribution period value
			// Then check if the days passed fall under that period
			// If it does we continue to check transactions
			// If it doesn't we set the phase to success and continue as nothing should be done
			let periodCount = periodMap[planObj.period.toLowerCase()]
			if(periodCount && days % periodCount != 0){
				member._doc.phase = "success"
				continue
			}
		}


		let baseData = {
			user_id: member.user_id,
			type: "higher_purchase"
		}

		let successfulTransactions = await pageFunctions.fetchTransactions({ ...baseData, status: "success", created_at: { $gte: midnight }})
		let pendingTransactions = await pageFunctions.fetchTransactions({ ...baseData, status: "pending", created_at: { $gte: midnight }})
		let failedTransactions = await pageFunctions.fetchTransactions({ ...baseData, status: "failed", created_at: { $gte: midnight }})

		if(successfulTransactions.length > 0)
			member._doc.phase = "success"
		else if(pendingTransactions.length > 0)
			member._doc.phase = "pending"
		else if(failedTransactions.length > 0)
			member._doc.phase = "failed"
		else
			member._doc.phase = "noattempt"
	}

	req.body.pageData = {
		higherPurchaseMembers
	}

	next()
}

module.exports = auto