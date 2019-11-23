let store = {
	loginButton: document.querySelector(".login-button"),
	loginFormTag: ".login-form",
	loginText: document.querySelector(".login-text"),
	loginInputs: Array.from(document.querySelectorAll(".login-form input"))
}

let loginButton = createButton(".login-text", "Enter Account", "Logging in...")

;(function attachEvents(){
	addEvent([store.loginButton], "click", startLogin)
	addEvent(store.loginInputs, "input,focus", () => hideAlert("login-error"))
})()

function startLogin(event){
	event.preventDefault()
	loginButton()
	let loginDetails = extractForm(store.loginFormTag)
	let missingDetails = hasKeys(loginDetails, ["phone", "password"])
	if(missingDetails.length > 0){
		loginButton("normal")
		return showAlert("login-error", `You didn't fill a value for ${missingDetails[0]}`)
	}

	return api("auth/login", { phone: loginDetails.phone, password: loginDetails.password })
				.then(handleLogin)

	function handleLogin(response){
		if(response.status == 200)
			redirect("/home")
		else if(response.code == "USER_DOES_NOT_EXIST")
			return showAlert("login-error", "No account has that phone number")
		else if(response.code == "INVALID_PASSWORD")
			return showAlert("login-error", "Invalid phone and password combination")
		loginButton("normal")
	}
}