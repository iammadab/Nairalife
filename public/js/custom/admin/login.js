let store = {
	loginButton: document.querySelector(".login-button"),
	loginFormTag: ".login-form",
	loginInputs: document.querySelectorAll(".login-form input")
}

;(function attachEvents(){
	addEvent([store.loginButton], "click", loginAdmin)
	addEvent(store.loginInputs, "input,focus", () => hideAlert("login-error"))
})()

let loginButton = createButton(".login-text", "Admin Login", "Logging in...")
function loginAdmin(event){
	event.preventDefault()
	loginButton()
	let loginDetails = extractForm(store.loginFormTag)
	let missingDetails = hasKeys(loginDetails, ["phone", "password"])
	if(missingDetails.length > 1){
		loginButton("normal")
		return showAlert("login-error", `You didn't fill data for ${missingDetails[0]}`)
	}

	return api("admin/login", { phone: loginDetails.phone, password: loginDetails.password })
			.then(handleResponse)

	function handleResponse(response){
		console.log(response)
		if(response.status == 200)
			console.log("Yay")
		else if(response.code == "USER_DOES_NOT_EXIST")
			showAlert("login-error", "Account not found")
		else if(response.code == "USER_NOT_AUTHORIZED")
			showAlert("login-error", "Account not authorized")
		else if(response.code == "INVALID_PASSWORD")
			showAlert("login-error", "Invalid password")
		loginButton("normal")
	}	
}