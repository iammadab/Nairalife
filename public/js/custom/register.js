let store = {
	registerButton: document.querySelector(".register-button"),
	registerFormTag: ".register-form",
	registrationInputs: Array.from(document.querySelectorAll(".register-form input"))
}

;(function attachEvents(){
	addEvent([store.registerButton], "click", startRegistration)
	addEvent(store.registrationInputs, "input,focus", () => hideError("register-error"))
})()

function startRegistration(event){
	event.preventDefault()
	let userDetails = extractForm(store.registerFormTag)
	let missingKeys = hasKeys(userDetails, ["fullname", "phone", "password"])

	if(missingKeys.length > 0)
		return showError("register-error", `You didn't fill data for ${missingKeys[0]}`)

	checkIfPhoneExists()
		.then(checkIfEmailExists)

	function checkIfPhoneExists(){
		return api("user/exists", { phone: userDetails.phone })
				.then(handleResponse)

		function handleResponse(response){
			if(!response.exists) return
			showError("register-error", "Phone already exists")
		}
	}

	function checkIfEmailExists(){
		return api("user/exists", { email: userDetails.email })
				.then(handleResponse)

		function handleResponse(response){
			if(!response.exists) return
			showError("register-error", "Email already exists")
		}
	}
}

