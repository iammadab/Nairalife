let store = {
	guarantorButton: document.querySelector(".guarantor-button"),
	guarantorFormTag: ".guarantor-form",
	inputs: Array.from(document.querySelectorAll(".guarantor-form input, .guarantor-form textarea, .guarantor-form select"))
}

;(function attachEvents(){
	addEvent([store.guarantorButton], "click", submitGuarantor)
	addEvent(store.inputs, "input,focus", () => hideAlert("guarantor-error"))
})()

function submitGuarantor(event){
	event.preventDefault()

	let submitButton = createButton(".guarantor-text", "Add Guarantor", "Adding Guarantor...")
	submitButton()

	let nameMap = {
		fullname: "fullname",
		phone: "phone",
		house_address: "house address",
		type_of_employer: "type of employer", 
		place_of_work: "place of work",
		description_of_work: "description of work",
		relationship: "relationship"
	}

	let guarantorDetails = extractForm(store.guarantorFormTag)

	let missingDetails = hasKeys(guarantorDetails, ["fullname", "phone", "house_address", "type_of_employer", "place_of_work", "description_of_work", "relationship"])
	if(missingDetails.length > 0){
		scrollTo(0, 100)
		submitButton("normal")
		return showAlert("guarantor-error", `Sorry, you didn't ${nameMap[missingDetails[0]]}`)
	}

	guarantorDetails.token = getToken()
	return api("user/guarantor", guarantorDetails)
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200)
			return redirect("/docs")
		submitButton("normal")
	}
}