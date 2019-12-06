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

function updateStatus(){
	let messageMap = {
		"2000000,daily": "You are doing the 2m daily",
		"2000000,weekly": "You are doing the 2m weekly",
		"2500000,daily": "You are doing the 2.5m daily",
		"2500000,weekly": "You are doing the 2.5m weekly"
	}
}