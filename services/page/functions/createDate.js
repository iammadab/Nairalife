function createDate(dateInput){
	if(!dateInput) return {}
	let dateObj = new Date(dateInput)
	console.log(dateObj)
}

console.log(createDate(new Date()))