let store = {
	selectCarButton: document.querySelector(".select-car-button"),
	carSelect: document.querySelector(".car-select")
}

;(function attachEvent(){
	addEvent([store.selectCarButton], "click", submitCar)
	addEvent([store.carSelect], "focus,input", () => hideAlert("plan-error"))
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