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
	let preferenceDetails = extractForm(store.preferenceFormTag)

	let nameMap = {
		sex: "choose your sex",
		relationship: "choose your relationship status",
		age: "enter your age",
		bio: "enter a description about yourself",
		partner: "choose your partner",
		work_duration: `choose how long you have been driving for ${preferenceDetails.partner}`,
		work_description: "describe your partnership",
		own_car: "choose your car status",
		earning: "select how much you earn monthly",
		reason: "enter the reason why nairalife should consider you for the higher purchase plan"
	}

	event.preventDefault()
	submitButton()
	
	let missingDetails = hasKeys(preferenceDetails, ["sex", "relationship", "age", "bio", "partner", "work_duration", "work_description", "own_car", "earning", "reason"])
	if(missingDetails.length > 0){
		submitButton("normal")
		scrollTo(0, 100)
		return showAlert("preference-error", `Sorry, you didn't ${nameMap[missingDetails[0]]}`)
	}

	preferenceDetails.token = getToken()
	return api("user/preference", preferenceDetails)
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200)
			return redirect("/car")
		submitButton("normal")
	}

}