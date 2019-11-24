let store = {
	preferenceButton: document.querySelector(".preference-submit"),
	preferenceFormTag: ".preference-form",
	inputs: Array.from(document.querySelectorAll(".preference-form input, .preference-form textarea, .preference-form select"))
}

;(function attachEvents(){
	addEvent([store.preferenceButton], "click", submitPreference)
	addEvent(store.inputs, "input,focus", () => hideAlert("preference-error"))
})()	

function submitPreference(event){
	event.preventDefault()
	let preferenceDetails = extractForm(store.preferenceFormTag)
	let missingDetails = hasKeys(preferenceDetails, ["sex", "relationship", "title", "bio", "work", "work_description", "earning", "contribution_receive", "contribution_make", "contribution_use"])
	if(missingDetails.length > 0)
		return showAlert("preference-error", `You didn't fill a value for ${missingDetails[0]}`)

	return api("user/preference", { ...preferenceDetails, token: getToken() })
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200)
			redirect("/home")
	}

}