let store = {
	requestButton: document.querySelector(".request-button"),
	requestInputs: document.querySelectorAll(".request-form textarea"),
	requestFormTag: ".request-form"
}

;(function attachEvents(){
	addEvent([store.requestButton], "click", requestCar)
	addEvent(store.requestInputs, "input,focus", () => hideAlert("request-error"))
})()

function requestCar(event){
	event.preventDefault()
	showAlert("request-error", "Sorry, you can't request for a car because your nairalife score is not up to 70!")
}