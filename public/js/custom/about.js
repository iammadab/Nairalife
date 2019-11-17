let store = {
	preferenceButton: document.querySelector(".preference-submit"),
	preferenceFormTag: ".preference-form"
}

;(function attachEvents(){
	addEvent([store.preferenceButton], "click", submitPreference)
})()	

function submitPreference(event){
	event.preventDefault()
	let preferenceDetails = extractForm(store.preferenceFormTag)
	let missingDetails = hasKeys(preferenceDetails, ["sex"])
}