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
	console.log(profileDetails)
}