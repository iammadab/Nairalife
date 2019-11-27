let store = {
	preferenceButton: document.querySelector(".preference-submit"),
	preferenceFormTag: ".preference-form",
	inputs: Array.from(document.querySelectorAll(".preference-form input, .preference-form textarea, .preference-form select"))
}

;(function attachEvents(){
	addEvent([store.preferenceButton], "click", submitPreference)
	addEvent(store.inputs, "input,focus", () => hideAlert("preference-error"))
})()	

let submitButton = createButton(".preference-text", "Complete Registration", "Submitting...")
function submitPreference(event){
	event.preventDefault()
	submitButton()
	let preferenceDetails = extractForm(store.preferenceFormTag)
	let missingDetails = hasKeys(preferenceDetails, ["sex", "relationship", "title", "bio", "partner", "work_description", "own_car", "earning", "contribution_make", "contribution_period", "contribution_use"])
	if(missingDetails.length > 0){
		submitButton("normal")
		return showAlert("preference-error", `You didn't fill a value for ${missingDetails[0]}`)
	}

	preferenceDetails.token = getToken()
	return api("user/preference", preferenceDetails)
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200)
			redirect("/home")
		submitButton("normal")
	}

}