let store = {
	residenceButton: document.querySelector(".residence-submit"),
	residenceFormTag: ".residence-form",
	inputs: Array.from(document.querySelectorAll(".residence-form input, .residence-form textarea"))
}

;(function attachEvents(){
	addEvent([store.residenceButton], "click", submitResidence)
	addEvent(store.inputs, "input,focus", () => hideAlert("residence-error"))
})()


function submitResidence(event){
	event.preventDefault()

	let submitButton = createButton(".residence-text", "Save Residence", "Saving...")
	submitButton()

	let nameMap = {
		address: "address",
		landmark: "landmark"
	}


	let residenceDetails = extractForm(store.residenceFormTag)
	
	let missingDetails = hasKeys(residenceDetails, ["address", "landmark"])
	if(missingDetails.length > 0){
		submitButton("normal")
		return showAlert("residence-error", `Sorry, you didn't ${nameMap[missingDetails[0]]}`)
	}

	residenceDetails.token = getToken()

	return api("user/house", residenceDetails)
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200)
			return redirect("/guarantor")
		submitButton("normal")
	}
}