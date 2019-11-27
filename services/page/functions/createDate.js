function createDate(dateInput){
	if(!dateInput) return {}
	let dateObj = new Date(dateInput)
		
	function getTime(){
		let timeString = dateObj.toLocaleTimeString()
		let timeParts = timeString.split(":"), period = timeParts[2].split(" ")[1]
		return `${timeParts[0]}:${timeParts[1]} ${period}`
	}

	function getDate(){
		let dateString = dateObj.toDateString()
		let dateParts = dateString.split(" ")
		return `${dateParts[2]} of ${dateParts[1]}, ${dateParts[3]}`
	}

	function getHypenDate(){
		let dateString = dateObj.toLocaleDateString()
		let dateParts = dateString.split("/")
		return `${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`
	}

	return {
		getTime,
		getDate,
		getHypenDate
	}

}

let dateGuy = createDate(new Date())
console.log(dateGuy.getTime())
console.log(dateGuy.getDate())
console.log(dateGuy.getHypenDate())