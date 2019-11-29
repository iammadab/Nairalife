let store = {
	startAutoSaveButton: document.querySelector(".start-autosave-button")
}

;(function attachEvents(){
	addEvent([store.startAutoSaveButton], "click", startAutoSave)
})()	

const startButton = createButton(".start-autosave-text", "Start Autosave", "Starting Autosave...")
function startAutoSave(event){
	event.preventDefault()
	startButton()

	return api("user/autosave/start", { token: getToken() })
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200)
			return redirect("/home")
		else
			console.log(response)
		startButton("normal")
	}
}