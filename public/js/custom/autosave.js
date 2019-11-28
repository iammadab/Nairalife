let store = {
	startAutoSaveButton: document.querySelector(".start-autosave-button")
}

;(function attachEvents(){
	addEvent([store.startAutoSaveButton], "click", startAutoSave)
})()	

function startAutoSave(event){
	event.preventDefault()

	return api("user/autosave/start", { token: getToken() })
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200)
			redirect("/home")
		else
			console.log(response)
	}
}