let store = {
	recoverPasswordButton: document.querySelector(".recover-password-button"),
	phoneElementTag: ".phone-form"
}

;(function attachEvent(){
	addEvent([ store.recoverPasswordButton ], "click", sendOtp)
})()

function sendOtp(event){
	event.preventDefault()
	let phoneDetails = extractForm(store.phoneElementTag)
	console.log(phoneDetails)
}