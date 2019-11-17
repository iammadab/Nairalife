let store = {
	preferenceButton: document.querySelector(".preference-submit"),
	preferenceFormTag: ".preference-form",
	inputs: Array.from(document.querySelectorAll(".preference-form input, .preference-form textarea, .preference-form select"))
}

;(function attachEvents(){
	addEvent([store.preferenceButton], "click", submitPreference)
	addEvent(store.inputs, "input,focus", () => hideError("preference-error"))
})()	

function submitPreference(event){
	event.preventDefault()
	let preferenceDetails = extractForm(store.preferenceFormTag)
	let missingDetails = hasKeys(preferenceDetails, ["sex"])
	if(missingDetails.length > 0)
		return showError("preference-error", `You didn't fill a value for ${missingDetails[0]}`)
}