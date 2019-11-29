let store = {
	requestButton: document.querySelector(".request-button"),
	requestInputs: document.querySelectorAll(".request-form input"),
	requestFormTag: ".request-form"
}

;(function attachEvents(){
	addEvent([store.requestButton], "click", requestCar)
})()

function requestCar(event){
	event.preventDefault()
}