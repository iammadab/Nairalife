function addWeeks(dt, weeks){
	return addDays(dt, weeks * 7)   
}

function addDays(dt, days){
	dt = new Date(dt)
	return new Date(
		dt.setDate(dt.getDate() + days)
	)
}

module.exports = {
	addWeeks,
	addDays
}