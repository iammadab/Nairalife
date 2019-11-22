let store = {
	loginButton: document.querySelector(".login-button"),
	loginFormTag: ".login-form",
	loginInputs: document.querySelectorAll(".login-form input")
}

;(function attachEvents(){
	addEvent([store.loginButton], "click", loginAdmin)
	addEvent(store.loginInputs, "input,focus", () => hideAlert("login-error"))
})()

function loginAdmin(event){
	event.preventDefault()
	let loginDetails = extractForm(store.loginFormTag)
	let missingDetails = hasKeys(loginDetails, ["phone", "password"])
	if(missingDetails.length > 1)
		return showAlert("login-error", `You didn't fill data for ${missingDetails[0]}`)

	return api("admin/login", { phone: data.phone, password: data.password })
			.then(handleResponse)

	function handleResponse(response){
		console.log(response)
		if(response.status == 200)
			console.log("Yay")
		else if(response.code == "USER_DOES_NOT_EXIST")
			return showAlert("login-error", "Account not found")
		else if(response.code == "USER_NOT_AUTHORIZED")
			return showAlert("login-error", "Account not authorized")
		else if(response.code == "INVALID_PASSWORD")
			return showAlert("login-error", "Invalid password")
	}	
}