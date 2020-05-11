let store = {
	// Profile information section
	saveInformationButton: document.querySelector(".save-information-button"),
	profileElementTag: ".profile-section",
	profileInputs: document.querySelectorAll(`.profile-section input, .profile-section select, .profile-section textarea`),

	//Password section
	changePasswordButton: document.querySelector(".change-password-button"),
	passwordFormElementTag: ".password-section",
	passwordInputs: document.querySelectorAll(`.password-section input, .password-section select, .password-section textarea`),

	//Account section
	updateBankButton: document.querySelector(".update-bank-button"),
	bankFormElementTag: ".bank-section",
	bankInputs: document.querySelectorAll(`.bank-section input, .bank-section select, .bank-section textarea`)
}

;(function attachEvents(){
	// Profile information section
	addEvent([store.saveInformationButton], "click", saveInformation)
	addEvent(store.profileInputs, "input,focus", () => hideAlert("profile-error"))

	// Password section
	addEvent([store.changePasswordButton], "click", changePassword)
	addEvent(store.passwordInputs, "input,focus", () => hideAlert("password-error"))
	addEvent(store.passwordInputs, "input,focus", () => hideAlert("password-success"))

	// Account section
	addEvent([store.updateBankButton], "click", updateBank)
	addEvent(store.bankInputs, "input,focus", () => hideAlert("bank-error"))
	addEvent(store.bankInputs, "input,focus", () => hideAlert("bank-success"))
})()

let saveButton = createButton(".save-text", "Save Profile", "Saving...")
function saveInformation(event){
	event.preventDefault()
	saveButton()
	let profileDetails = extractForm(store.profileElementTag)
	let missingKeys = hasKeys(profileDetails, ["fullname", "phone", "email", "sex", "relationship", "bio"])
	if(missingKeys.length > 0){
		scrollTo(0, 100)
		saveButton("normal")
		return showAlert("profile-error", `Sorry, you didn't enter your ${missingKeys[0]}`)
	}

	return api("user/profile", { ...profileDetails, token: getToken() })
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200){
			showAlert("profile-success", "Nairalife Profile updated successfully")
			redirect(window.location.href)
		}
		scrollTo(0, 100)
		saveButton("normal")
	}
}







let passwordButton = createButton(".password-text", "Change Password", "Changing Password...")
function changePassword(event){
	event.preventDefault()
	passwordButton()
	let passwordDetails = extractForm(store.passwordFormElementTag)
	let missingKeys = hasKeys(passwordDetails, ["oldPassword", "newPassword", "newPassword2"])
	if(missingKeys.length > 0){
		passwordButton("normal")
		return showAlert("password-error", `Sorry, You didn't enter ${missingKeys[0]}`)
	}

	if(passwordDetails.newPassword != passwordDetails.newPassword2){
		passwordButton("normal")
		return showAlert("password-error", "Sorry, new passwords do not match")
	}

	return api("user/password", { ...passwordDetails, token: getToken() })
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200){
			showAlert("password-success", "Password changed successfully")
			store.passwordInputs.forEach(input => input.value = "")
		}
		else if(response.code == "INVALID_PASSWORD")
			showAlert("password-error", "Sorry, your old Nairalife password is incorrect")
		passwordButton("normal")
	}
}



let bankButton = createButton(".bank-text", "Update Bank", "Updating Bank...")
function updateBank(event){
	event.preventDefault()
	bankButton()
	let bankDetails = extractForm(store.bankFormElementTag)
	let missingKeys = hasKeys(bankDetails, ["account_number", "bank_code"])
	if(missingKeys.length > 0){
		bankButton("normal")
		return showAlert("bank-error", `Sorry, you didn't enter ${missingKeys[0]}`)
	}

	let { account_number, bank_code } = bankDetails
	return api("bank/verify", { token: getToken(), account_number, bank_code })
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200)
			showAlert("bank-success", "Bank Updated")
		else if(response.code == "ACCOUNT_VERIFICATION_FAILED")
			showAlert("bank-error", response.message)
		else if(response.code == "FAILED_IDENTITY_TEST")
			showAlert("bank-error", "Sorry, your bvn and account number don't match")
		bankButton("normal")
	}
}