let store = {
	planState: { amount: null, period: null },
	planInputs: document.querySelectorAll("select")
}

;(function attachEvents(){
	addEvent(store.planInputs, "change", updateState)
})()

function updateState(event){
	event.preventDefault()
	store.planState[event.target.name] = event.target.value ? event.target.value : null
}