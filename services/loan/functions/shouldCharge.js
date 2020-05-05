function shouldCharge(period, start, today){
	start = new Date(start), today = today ? new Date(today) : new Date()

	// Based on the start date and the period, the goal is to determine if the user should be charge on a particular day
	// First we need to turn the dates to midnight
	start = start.setHours(0, 0, 0, 0)
	today = today.setHours(0, 0, 0, 0)

	console.log(new Date(start).toLocaleString())
	console.log(new Date(today).toLocaleString())

	//Next, we have to figure out how many days has passed since the start and today
	const MILLISECONDS_PER_DAY = (1000 * 3600 * 24)
	let millisecondsPassed = Number(today) - Number(start)
	let days = millisecondsPassed / MILLISECONDS_PER_DAY

	// If negative days has passed, just return false
	if(days < 0)
		return false

	let periodMap = {
		daily: 1,
		weekly: 7
	}

	//We use the period map to covert the period to days
	let periodCount = periodMap[period.toLowerCase()]
	// Now, we know how many days have passed and the period
	// If the days passed is a multiple of the period then the user should be charged
	if(periodCount && days % periodCount != 0)
		return false

	//If we are here, then the user should be charged
	return true 
}

module.exports = shouldCharge