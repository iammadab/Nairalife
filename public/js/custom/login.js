let store = {
	loginButton: document.querySelector(".login-button"),
	loginFormTag: ".login-form",
	loginInputs: Array.from(document.querySelectorAll(".login-form input"))
}

;(function attachEvents(){
	addEvent([store.loginButton], "click", startLogin)
	addEvent(store.loginInputs, "input,focus", () => hideError("login-error"))
})()

function startLogin(event){
	event.preventDefault()
	let loginDetails = extractForm(store.loginFormTag)
	let missingDetails = hasKeys(loginDetails, ["phone", "password"])
	if(missingDetails.length > 0)
		return showError("login-error", `You didn't fill a value for ${missingDetails[0]}`)


}