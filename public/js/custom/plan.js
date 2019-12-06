let store = {
	planState: { amount: null, period: null },
	planInputs: document.querySelectorAll("select"),
	choosePlanButton: document.querySelector(".choose-plan-button")
}

;(function attachEvents(){
	addEvent(store.planInputs, "change", updateState)
	addEvent(store.planInputs, "input,focus", () => hideAlert("plan-error"))
	addEvent([store.choosePlanButton], "click", addPlan)
})()

function updateState(event){
	event.preventDefault()
	store.planState[event.target.name] = event.target.value ? event.target.value : null
	updateStatus(`${store.planState.amount},${store.planState.period}`)
}

function updateStatus(currentStatus){
	let messageMap = {
		"2000000,daily": "You are doing the 2m daily",
		"2000000,weekly": "You are doing the 2m weekly",
		"2500000,daily": "You are doing the 2.5m daily",
		"2500000,weekly": "You are doing the 2.5m weekly"
	}

	let message = messageMap[currentStatus.toLowerCase()]
	if(!message)
		message = "Choose a plan above"

	showAlert("plan-alert", message)
}

function addPlan(event){
	event.preventDefault()
	if(!store.planState.amount || !store.planState.period)
		showAlert("plan-error", "Choose a plan below")
}