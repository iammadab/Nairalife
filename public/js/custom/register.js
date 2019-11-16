let store = {
	registerButton: document.querySelector(".register-button"),
	registerFormTag: ".register-form",
	registrationInputs: Array.from(document.querySelectorAll(".register-form input")),
	userDetails: {},

	verifyOtpButton: document.querySelector(".verifyOtpButton"),
	otpFormTag: ".otp-form",
	otpInputs: Array.from(document.querySelectorAll(".otp-form input"))
}

;(function attachEvents(){
	addEvent([store.registerButton], "click", startRegistration)
	addEvent(store.registrationInputs, "input,focus", () => hideError("register-error"))

	addEvent([store.verifyOtpButton], "click", registerUser)
	addEvent(store.otpInputs, "input,focus", () => hideError("otp-error"))
})()










function startRegistration(event){
	event.preventDefault()
	let userDetails = store.userDetails = extractForm(store.registerFormTag)
	let missingKeys = hasKeys(userDetails, ["fullname", "phone", "password"])

	if(missingKeys.length > 0)
		return showError("register-error", `You didn't fill data for ${missingKeys[0]}`)

	checkIfPhoneExists()
		.then(checkIfEmailExists)
		.then(createOtp)



	function checkIfPhoneExists(){
		return api("user/exist", { phone: userDetails.phone })
				.then(handleResponse)

		function handleResponse(response){
			if(!response.exists) return
			showError("register-error", "Phone already exists")
			throw new Error()
		}
	}

	function checkIfEmailExists(){
		return api("user/exist", { email: userDetails.email })
				.then(handleResponse)

		function handleResponse(response){
			if(!response.exists) return
			showError("register-error", "Email already exists")
			throw new Error()
		}
	}

	function createOtp(){
		return api("otp/create", { phone: userDetails.phone })
				.then(handleOtpGeneration)

		function handleOtpGeneration(response){
			if(response.status == 200)
				showView("otp-section")
			else
				showError("register-error", "Problem generating otp, try again later")
		}
	}
}







function registerUser(event){
	event.preventDefault()
	let otpDetails = extractForm(store.otpFormTag)
	let missingKeys = hasKeys(otpDetails, ["code"])

	if(missingKeys.length > 0)
		return showError("otp-error", `You didn't fill data for ${missingKeys[0]}`)

	store.userDetails.code = otpDetails.code

	api("auth", store.userDetails)
		.then(handleRegistration)

	function handleRegistration(response){
		if(response.status == 200)
			redirect("/dashboard")
		else if(response.code == "OTP_VERIFICATION_FAILED")
			showError("otp-error", "Invalid Otp")
	}

}