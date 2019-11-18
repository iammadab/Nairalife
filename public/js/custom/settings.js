let store = {
	saveInformationButton: document.querySelector(".save-information-button"),
	profileElementTag: ".profile-section",
	profileInputs: document.querySelectorAll(`.profile-section input, .profile-section select, .profile-section textarea`)
}

;(function attachEvents(){
	addEvent([store.saveInformationButton], "click", saveInformation)
	addEvent(store.profileInputs, "input,focus", () => hideError("profile-error"))
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
		console.log(response)
		if(response.status == 200)
			console.log("Yay")
	}
}