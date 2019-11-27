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
	addEvent(store.registrationInputs, "input,focus", () => hideAlert("register-error"))

	addEvent([store.verifyOtpButton], "click", registerUser)
	addEvent(store.otpInputs, "input,focus", () => hideAlert("otp-error"))
	addEvent([store.resendOtpButton], "click", resendOtp)
})()









let registerButton = createButton(".register-text", "Join Us", "Registering...")

function startRegistration(event){
	let nameMap = {
		fullname: "full name",
		phone: "phone number",
		password: "password"
	}

	event.preventDefault()
	registerButton()
	let userDetails = store.userDetails = extractForm(store.registerFormTag)
	let missingKeys = hasKeys(userDetails, ["fullname", "phone", "password"])

	if(missingKeys.length > 0){
		registerButton("normal")
		return showAlert("register-error", `Sorry, you didn't enter your ${nameMap[missingKeys[0]]}`)
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
			showAlert("register-error", "Sorry, phone number already exists on Nairalife")
			throw new Error()
		}
	}

	function checkIfEmailExists(){
		return api("user/exist", { email: userDetails.email })
				.then(handleResponse)

		function handleResponse(response){
			if(!response.exists) return
			registerButton("normal")
			showAlert("register-error", "Sorry, email address already exists on Nairalife")
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
				showAlert("register-error", "Sorry, we have a problem generating otp, please try again later")
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
		return showAlert("otp-error", `Sorry, you didn't enter ${missingKeys[0]}`)
	}

	store.userDetails.code = otpDetails.code

	api("auth", store.userDetails)
		.then(handleRegistration)

	function handleRegistration(response){
		if(response.status == 200)
			redirect("/fee")
		else if(response.code == "OTP_VERIFICATION_FAILED")
			showAlert("otp-error", "Invalid Otp")
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