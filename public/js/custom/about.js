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
	let nameMap = {
		sex: "choose your sex",
		relationship: "choose your relationship status",
		title: "choose your title",
		bio: "enter a description about yourself",
		work: "choose your partner",
		work_description: "describe your partnership",
		car_status: "choose your car status",
		earning: "select how much you earn monthly",
		contribution_freq: "select how often you can contribute",
		contribution_make: "select how much you can contribute",
		contribution_use: "enter your contribution goals",
	}
	event.preventDefault()
	let preferenceDetails = extractForm(store.preferenceFormTag)
	let missingDetails = hasKeys(preferenceDetails, ["sex", "relationship", "title", "bio", "work", "work_description", "car_status", "earning", "contribution_freq", "contribution_make", "contribution_use"])
	if(missingDetails.length > 0)
		return showAlert("preference-error", `Sorry, you didn't ${nameMap[missingDetails[0]]}`)

	return api("user/preference", { ...preferenceDetails, token: getToken() })
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200)
			redirect("/home")
	}

}