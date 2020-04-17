let store = {
	residenceButton: document.querySelector(".residence-submit"),
	residenceFormTag: ".residence-form",
	inputs: Array.from(document.querySelectorAll(".residence-form input, .residence-form textarea, .residence-form select"))
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
		address: "enter your house address",
		landmark: "enter a popular landmark nearest to your place of residence",
		city: "enter the city you reside in",
		state: "select the state you reside in"
	}


	let residenceDetails = extractForm(store.residenceFormTag)
	
	let missingDetails = hasKeys(residenceDetails, ["address", "landmark", "city", "state"])
	if(missingDetails.length > 0){
		submitButton("normal")
		return showAlert("residence-error", `Sorry, you didn't ${nameMap[missingDetails[0]]}`)
	}

	residenceDetails.token = getToken()

	return api("user/house", residenceDetails)
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200)
			return redirect("/loan")
		submitButton("normal")
	}
}