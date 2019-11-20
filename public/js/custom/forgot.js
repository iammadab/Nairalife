let store = {
	phone: null,
	code: null,
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

function sendOtp(event){
	event.preventDefault()
	let phoneDetails = extractForm(store.phoneElementTag)
	let missingDetails = hasKeys(phoneDetails, ["phone"])
	if(missingDetails.length > 0)
		showAlert("phone-error", `You didn't fill data for ${missingDetails[0]}`)

	store.phone = phoneDetails.phone

	return api("otp/create", { phone: phoneDetails.phone, type: "reset" })
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200)
			showView("otp-section")
		else if(response.code == "USER_DOES_NOT_EXIST")
			showAlert("phone-error", "Account not found")
	}
}


function verifyOtp(event){
	event.preventDefault()
	let otpDetails = extractForm(store.otpFormTag)
	let missingDetails = hasKeys(otpDetails, ["code"])
	if(missingDetails.length > 0)
		return showAlert("otp-error", `You didn't fill data for ${missingDetails[0]}`)

	store.code = otpDetails.code

	return api("otp/verify", { phone: store.phone, code: otpDetails.code })
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200)
			showView("password-section")
		else if(response.code == "OTP_VERIFICATION_FAILED")
			showAlert("otp-error", "Phone verification failed")
	}
}

function changePassword(event){
	event.preventDefault()
	let passwordDetails = extractForm(store.passwordFormTag)
	let missingDetails = hasKeys(passwordDetails, ["password", "password2"])
	if(missingDetails.length > 0)
		return showAlert("password-error", `You didn't fill data for ${missingDetails[0]}`)

	if(passwordDetails.password != passwordDetails.password2)
		return showAlert("password-error", "Passwords do not match")

	store.password = passwordDetails.password

	return api("user/password/forgot", { phone: store.phone, code: store.code, password: passwordDetails.password })
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200)
			loginUser()
		else
			showAlert("password-error", "Problem changing password. Try again later")
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