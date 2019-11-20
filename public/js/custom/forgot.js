let store = {
	recoverPasswordButton: document.querySelector(".recover-password-button"),
	phoneElementTag: ".phone-form",
	phoneInputs: Array.from(document.querySelectorAll(".phone-form input"))
}

;(function attachEvent(){
	addEvent([ store.recoverPasswordButton ], "click", sendOtp)
	addEvent(store.phoneInputs, "input,focus", () => hideAlert("phone-error"))
})()

function sendOtp(event){
	event.preventDefault()
	let phoneDetails = extractForm(store.phoneElementTag)
	let missingDetails = hasKeys(phoneDetails, ["phone"])
	if(missingDetails.length > 0)
		showAlert("phone-error", `You didn't fill data for ${missingDetails[0]}`)

	return api("otp/create", { phone: phoneDetails.phone, type: "reset" })
			.then(handleResponse)

	function handleResponse(response){
		console.log(response)
		if(response.status == 200)
			showView("otp-section")
		else if(response.code == "USER_DOES_NOT_EXIST")
			showAlert("phone-error", "Account not found")
	}
}