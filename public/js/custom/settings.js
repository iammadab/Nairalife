let store = {
	// Profile information section
	saveInformationButton: document.querySelector(".save-information-button"),
	profileElementTag: ".profile-section",
	profileInputs: document.querySelectorAll(`.profile-section input, .profile-section select, .profile-section textarea`),

	//Password section
	changePasswordButton: document.querySelector(".change-password-button"),
	passwordFormElementTag: ".password-section",
	passwordInputs: document.querySelectorAll(`.password-section input, .password-section select, .password-section textarea`)
}

;(function attachEvents(){
	// Profile information section
	addEvent([store.saveInformationButton], "click", saveInformation)
	addEvent(store.profileInputs, "input,focus", () => hideError("profile-error"))

	// Password section
	addEvent([store.changePasswordButton], "click", changePassword)
	addEvent(store.passwordInputs, "input,focus", () => hideError("password-error"))
})()

function saveInformation(event){
	event.preventDefault()
	let profileDetails = extractForm(store.profileElementTag)
	let missingKeys = hasKeys(profileDetails, ["fullname", "phone", "email", "sex", "title", "relationship", "bio"])
	if(missingKeys.length > 0)
		return showError("profile-error", `You didn't fill data for ${missingKeys[0]}`)

	return api("user/profile", { ...profileDetails, token: getToken() })
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200){
			showAlert("profile-success", "Profile updated successfully")
			redirect(window.location.href)
		}
	}
}

function changePassword(event){
	event.preventDefault()
	
	let passwordDetails = extractForm(store.passwordFormElementTag)
	let missingKeys = hasKeys(passwordDetails, ["oldPassword", "newPassword", "newPassword2"])
	if(missingKeys.length > 0)
		return showAlert("password-error", `You didn't fill data for ${missingKeys[0]}`)

	if(passwordDetails.newPassword != passwordDetails.newPassword2)
		return showAlert("password-error", "New password's do not match")

	return api("user/password", { ...passwordDetails, token: getToken() })
			.then(handleResponse)

	function handleResponse(response){

		if(response.status == 200){
			showAlert("password-success", "Password changed successfully")
			store.passwordInputs.forEach(input => input.value = "")
		}
		else if(response.code == "INVALID_PASSWORD")
			showAlert("password-error", "Invalid Password")
	}
}