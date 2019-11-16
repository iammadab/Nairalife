let store = {
	registerButton: document.querySelector(".register-button"),
	registerFormTag: ".register-form"
}

;(function attachEvents(){
	addEvent([store.registerButton], "click", startRegistration)
})()

function startRegistration(event){
	event.preventDefault()
	let userDetails = extractForm(store.registerFormTag)
	console.log(userDetails)
}

