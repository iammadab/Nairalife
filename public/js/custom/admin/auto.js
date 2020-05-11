let store = {
	saveButtons: document.querySelectorAll(".save-button")
}

;(function attachEvents(){
	addEvent(store.saveButtons, "click", autoSave)
})()

function autoSave(event){
	event.preventDefault()
	let user_id = event.target.dataset.user_id
	let saveButton = createButton(`.save-button-text-${user_id}`, "Save", "Saving...")
	saveButton()

	return api("user/save", { user_id: user_id, token: getToken("atoken") })
			.then(handleResponse)

	function handleResponse(response){
		console.log(response)
		if(response.status == 200){
			event.target.classList.add("otp-error")
			event.target.nextElementSibling.classList.remove("otp-error")
		}
		saveButton("normal")
	}
}