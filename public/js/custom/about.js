let store = {
	preferenceButton: document.querySelector(".preference-submit"),
	preferenceFormTag: ".preference-form",
	inputs: Array.from(document.querySelectorAll(".preference-form input, .preference-form textarea, .preference-form select"))
	// fileInputs: document.querySelectorAll("[type=file]")
}

;(function attachEvents(){
	addEvent([store.preferenceButton], "click", submitPreference)
	addEvent(store.inputs, "input,focus", () => hideAlert("preference-error"))
	// addEvent(store.fileInputs, "change", handleUpload)
})()	

let submitButton = createButton(".preference-text", "Complete Registration", "Submitting...")
function submitPreference(event){
	let nameMap = {
		sex: "choose your sex",
		relationship: "choose your relationship status",
		title: "choose your title",
		bio: "enter a description about yourself",
		partner: "choose your partner",
		work_description: "describe your partnership",
		own_car: "choose your car status",
		earning: "select how much you earn monthly",
		reason: "enter the reason why nairalife should consider you for the higher purchase plan"
	}
	event.preventDefault()
	submitButton()
	let preferenceDetails = extractForm(store.preferenceFormTag)

	let missingDetails = hasKeys(preferenceDetails, ["sex", "relationship", "title", "bio", "partner", "work_description", "own_car", "earning", "reason"])
	if(missingDetails.length > 0){
		submitButton("normal")
		return showAlert("preference-error", `Sorry, you didn't ${nameMap[missingDetails[0]]}`)
	}

	preferenceDetails.token = getToken()
	return api("user/preference", preferenceDetails)
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200)
			return redirect("/auto")
		submitButton("normal")
	}

}

// function handleUpload(event){
// 	const formData = new FormData()
// 	formData.append(event.target.name, event.target.files[0])
// 	formData.append("user_id", store.preferenceButton.dataset["user_id"])
// 	return fetch("api/user/upload", {
// 				method: "POST",
// 				body: formData
// 			})
// 			.then(console.log)
// 			.catch(console.log)
// }