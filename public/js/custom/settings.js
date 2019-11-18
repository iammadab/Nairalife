let store = {
	saveInformationButton: document.querySelector(".save-information-button"),
	profileElementTag: ".profile-section"
}

;(function attachEvents(){
	addEvent([store.saveInformationButton], "click", saveInformation)
})()

function saveInformation(event){
	event.preventDefault()
	let profileDetails = extractForm(store.profileElementTag)
	let missingKeys = hasKeys(profileDetails, ["fullname", "phone", "email", "sex", "title", "relationship", "bio"])
	if(missingKeys.length > 0)
		return showError("profile-error", `You didn't fill data for ${missingKeys[0]}`)
}