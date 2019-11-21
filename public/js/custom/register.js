let store = {
	registerButton: document.querySelector(".register-button"),
	registerFormTag: ".register-form",
	registrationInputs: Array.from(document.querySelectorAll(".register-form input")),
	userDetails: {},

	verifyOtpButton: document.querySelector(".verifyOtpButton"),
	otpFormTag: ".otp-form",
	otpInputs: Array.from(document.querySelectorAll(".otp-form input")),
	resendOtpButton: document.querySelector(".resend-otp"),
	otpCountdownContainer: document.querySelector(".otp-countdown-container"),
	otpResendContainer: document.querySelector(".otp-resend-container")
}

;(function attachEvents(){
	addEvent([store.registerButton], "click", startRegistration)
	addEvent(store.registrationInputs, "input,focus", () => hideError("register-error"))

	addEvent([store.verifyOtpButton], "click", registerUser)
	addEvent(store.otpInputs, "input,focus", () => hideError("otp-error"))
	addEvent([store.resendOtpButton], "click", resendOtp)
})()









let registerButton = createButton(".register-text", "Join Us", "Registering...")

function startRegistration(event){
	event.preventDefault()
	registerButton()
	let userDetails = store.userDetails = extractForm(store.registerFormTag)
	let missingKeys = hasKeys(userDetails, ["fullname", "phone", "password"])

	if(missingKeys.length > 0){
		registerButton("normal")
		return showError("register-error", `You didn't fill data for ${missingKeys[0]}`)
	}

	checkIfPhoneExists()
		.then(checkIfEmailExists)
		.then(createOtp)



	function checkIfPhoneExists(){
		return api("user/exist", { phone: userDetails.phone })
				.then(handleResponse)

		function handleResponse(response){
			if(!response.exists) return
			registerButton("normal")
			showError("register-error", "Phone already exists")
			throw new Error()
		}
	}

	function checkIfEmailExists(){
		return api("user/exist", { email: userDetails.email })
				.then(handleResponse)

		function handleResponse(response){
			if(!response.exists) return
			registerButton("normal")
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
			registerButton("normal")
		}
	}
}






let otpButton = createButton(".otp-text", "Verify", "Verifying...")

function registerUser(event){
	event.preventDefault()
	otpButton()
	let otpDetails = extractForm(store.otpFormTag)
	let missingKeys = hasKeys(otpDetails, ["code"])

	if(missingKeys.length > 0){
		otpButton("normal")
		return showError("otp-error", `You didn't fill data for ${missingKeys[0]}`)
	}

	store.userDetails.code = otpDetails.code

	api("auth", store.userDetails)
		.then(handleRegistration)

	function handleRegistration(response){
		if(response.status == 200)
			redirect("/account")
		else if(response.code == "OTP_VERIFICATION_FAILED")
			showError("otp-error", "Invalid Otp")
		otpButton("normal")
	}

}


function resendOtp(){
	return api("otp/create", { phone: store.userDetails.phone })
			.then(handleResend)

	function handleResend(response){
		if(response.status == 200)
			getCounter(30, displayTimer, showResend)
	}

	function displayTimer(timeValue){
		showTimer()
		setValue([".otp-countdown"], timeValue)
	}

	function showTimer(){
		store.otpCountdownContainer.style.display = "block"
		store.otpResendContainer.style.display = "none"
	}

	function showResend(){
		store.otpCountdownContainer.style.display = "none"
		store.otpResendContainer.style.display = "block"
	}
}