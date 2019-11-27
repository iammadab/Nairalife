function createDate(dateInput){
	if(!dateInput) return {}
	let dateObj = new Date(dateInput)
		
	function getTime(){
		let timeString = dateObj.toLocaleTimeString()
		let timeParts = timeString.split(":"), period = timeParts[2].split(" ")[1]
		return `${timeParts[0]}:${timeParts[1]} ${period}`
	}

	return {
		getTime
	}

}

let dateGuy = createDate(new Date())
console.log(dateGuy.getTime())