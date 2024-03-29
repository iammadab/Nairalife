let store = {
	phone: null,
	code: null,
	password: null, 
	
	// Phone section
	recoverPasswordButton: document.querySelector(".recover-password-button"),
	phoneElementTag: ".phone-form",
	phoneInputs: Array.from(document.querySelectorAll(".phone-form input")),

	// Otp section
	verifyOtpButton: document.querySelector(".verifyOtpButton"),
	otpFormTag: ".otp-form",
	otpInputs: Array.from(document.querySelectorAll(".otp-form input")),

	// Password section
	changePasswordButton: document.querySelector(".change-password-button"),
	passwordFormTag: ".password-form",
	passwordInputs: Array.from(document.querySelectorAll(".password-form, input"))
}

;(function attachEvent(){
	addEvent([ store.recoverPasswordButton ], "click", sendOtp)
	addEvent(store.phoneInputs, "input,focus", () => hideAlert("phone-error"))

	addEvent([store.verifyOtpButton], "click", verifyOtp)
	addEvent(store.otpInputs, "input,focus", () => hideAlert("otp-error"))

	addEvent([store.changePasswordButton], "click", changePassword)
	addEvent(store.passwordInputs, "input,focus", () => hideAlert("password-error"))
})()











let recoverButton = createButton(".recover-text", "Recover Password", "Sending Otp...")

function sendOtp(event){
	let nameMap = {
		phone: "enter your phone number"
	}
	event.preventDefault()
	recoverButton()
	let phoneDetails = extractForm(store.phoneElementTag)
	let missingDetails = hasKeys(phoneDetails, ["phone"])
	if(missingDetails.length > 0){
		recoverButton("normal")
		showAlert("phone-error", `Sorry, you didn't ${nameMap[missingDetails[0]]}`)
	}

	store.phone = phoneDetails.phone

	return api("otp/create", { phone: phoneDetails.phone, type: "reset" })
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200)
			showView("otp-section")
		else if(response.code == "USER_DOES_NOT_EXIST")
			showAlert("phone-error", "Sorry, Nairalife account was not found")
		recoverButton("normal")
	}
}





let verifyButton = createButton(".verify-text", "Verify", "Verifying Otp...")

function verifyOtp(event){
	event.preventDefault()
	verifyButton()
	let otpDetails = extractForm(store.otpFormTag)
	let missingDetails = hasKeys(otpDetails, ["code"])
	if(missingDetails.length > 0){
		verifyButton("normal")
		return showAlert("otp-error", `Sorry, you didn't enter ${missingDetails[0]}`)
	}

	store.code = otpDetails.code

	return api("otp/verify", { phone: store.phone, code: otpDetails.code })
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200)
			showView("password-section")
		else if(response.code == "OTP_VERIFICATION_FAILED")
			showAlert("otp-error", "Phone verification failed")
		verifyButton("normal")
	}
}










let passwordButton = createButton(".password-text", "Change Password", "Changing Password...")

function changePassword(event){
	event.preventDefault()
	passwordButton()
	let passwordDetails = extractForm(store.passwordFormTag)
	let missingDetails = hasKeys(passwordDetails, ["password", "password2"])
	if(missingDetails.length > 0){
		passwordButton("normal")
		return showAlert("password-error", `Sorry, you didn't enter ${missingDetails[0]}`)
	}

	if(passwordDetails.password != passwordDetails.password2){
		passwordButton("normal")
		return showAlert("password-error", "Sorry, Passwords do not match. Please try again below")
	}

	store.password = passwordDetails.password

	return api("user/password/forgot", { phone: store.phone, code: store.code, password: passwordDetails.password })
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200)
			return loginUser()
		else
			showAlert("password-error", "Sorry, we have encountered a problem changing password. Please try again later")
		passwordButton("normal")
	}
}

function loginUser(){
	return api("auth/login", { phone: store.phone, password: store.password })
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200)
			redirect("/home")
		else 
			redirect("/login")
	}
	
}