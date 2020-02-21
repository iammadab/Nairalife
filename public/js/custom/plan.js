let store = {
	selectCarButton: document.querySelector(".select-car-button"),
	carSelect: document.querySelector(".car-select"),
	displayText: document.querySelector(".plan-alert .alert-text")
}

;(function attachEvent(){
	addEvent([store.selectCarButton], "click", submitCar)
	addEvent([store.carSelect], "focus,input", () => hideAlert("plan-error"))
	addEvent([store.carSelect], "input", displayData)
})()

const selectButton = createButton(".select-car-text", "Select Car", "Selecting...")

function submitCar(event){
	event.preventDefault()
	selectButton()

	let chosenCar = store.carSelect.value
	if(!chosenCar){
		selectButton("normal")
		return showAlert("plan-error", "You haven't selected a vehicle")
	}

	return api("user/car", { token: getToken(), id: chosenCar })
					.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200)
			return reload()
		selectButton("normal")
	}
}

function displayData(event){
	console.log(store.carSelect.value)
	if(!store.carSelect.value)
		store.displayText.innerHTML = "Choose a plan above"
	else
		store.displayText.innerHTML = "You will pay a hire purchase price of &#8358;2,600,000 for 2 years and service charge of &#8358;200,000 yearly"
}