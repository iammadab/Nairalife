function addWeeks(dt, weeks){
	dt = new Date(dt) 
	return new Date(
 		dt.setDate(dt.getDate() + (weeks * 7))
	)    
}

module.exports = {
	addWeeks
}