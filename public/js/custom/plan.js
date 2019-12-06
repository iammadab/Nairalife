let store = {
	planState: { total_amount: null, period: null, amount: null },
	planInputs: document.querySelectorAll("select"),
	choosePlanButton: document.querySelector(".choose-plan-button")
}

let messageMap = {
	"2000000,daily": [ "You are doing the 2m daily", 6000 ],
	"2000000,weekly": [ "You are doing the 2m weekly", 40000 ],
	"2500000,daily": [ "You are doing the 2.5m daily", 4000 ],
	"2500000,weekly": [ "You are doing the 2.5m weekly", 30000 ]
}

;(function attachEvents(){
	addEvent(store.planInputs, "change", updateState)
	addEvent(store.planInputs, "input,focus", () => hideAlert("plan-error"))
	addEvent([store.choosePlanButton], "click", addPlan)
})()

function updateState(event){
	event.preventDefault()
	store.planState[event.target.name] = event.target.value ? event.target.value : null
	updateStatus(`${store.planState.total_amount},${store.planState.period}`)
}

function updateStatus(currentStatus){
	let messageArray = messageMap[currentStatus.toLowerCase()], message = messageArray ? messageArray[0] : ""
	if(!message)
		message = "Choose a plan above"

	//Update the value for the amount
	store.planState.amount = messageMap[currentStatus.toLowerCase()][1]

	showAlert("plan-alert", message)
}

function addPlan(event){
	event.preventDefault()
	if(!store.planState.total_amount || !store.planState.period)
		return showAlert("plan-error", "Choose a plan below")

	let data = { ...store.planState }
	console.log(data)
}