const { addDays } = require("../../../lib/date")

function paymentTrajectory(period, start, today){
	start = new Date(start), today = today ? new Date(today) : new Date()
	
	// Based on the start date and the period, the goal is to generate the payment trajectory
	// First we need to set the dates to midnight
	start = start.setHours(0, 0, 0, 0)
	today = today.setHours(0, 0, 0, 0)

	//This figures out how many days has passed since the start
	const MILLISECONDS_PER_DAY = (1000 * 3600 * 24)
	let millisecondsPassed = Number(today) - Number(start)
	let days = millisecondsPassed / MILLISECONDS_PER_DAY

	let periodMap = {
		daily: 1,
		weekly: 7
	}

	//We use the period map to covert the period to days
	let periodCount = periodMap[period.toLowerCase()]

	//This figures out the date of the last payment
	let daysSinceLast = days % periodCount, lastPaymentDuration = days - daysSinceLast
	let lastPayment = addDays(start, lastPaymentDuration)


	return {
		days,
		period: periodCount,
		lastPayment
	}
}

module.exports = paymentTrajectory