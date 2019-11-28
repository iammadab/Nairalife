let store = {
	startAutoSaveButton: document.querySelector(".start-autosave-button")
}

;(function attachEvents(){
	addEvent([store.startAutoSaveButton], "click", startAutoSave)
})()	

function startAutoSave(event){
	event.preventDefault()
	console.log("Starting autosave")
}