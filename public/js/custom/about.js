let store = {
	preferenceButton: document.querySelector(".preference-submit")
}

;(function attachEvents(){
	addEvent([store.preferenceButton], "click", submitPreference)
})()	

function submitPreference(event){
	event.preventDefault()
}