let store = {
	saveButtons: document.querySelectorAll(".save-button")
}

;(function attachEvents(){
	addEvent(store.saveButtons, "click", autoSave)
})()

function autoSave(event){
	event.preventDefault()
	let user_id = event.target.dataset.user_id

	return api("user/save", { user_id: user_id, token: getToken("atoken") })
			.then(handleResponse)

	function handleResponse(response){
		console.log(response)
	}
}