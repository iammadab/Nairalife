let store = {
	addPointsButton: document.querySelector(".add-points-button"),
	addPointsFormTag: ".add-points-form",
	addPointsInputs: document.querySelectorAll(".add-points-form input, .add-points-form select, .add-points-form textarea")
}

;(function attachEvents(){
	addEvent([store.addPointsButton], "click", addPoints)
	addEvent(addPointsInputs, "input,focus", () => hideAlert("add-points-error"))
	addEvent(addPointsInputs, "input,focus", () => hideAlert("add-points-success"))
})()

function addPoints(event){
	event.preventDefault()
	console.log("Adding the points")
}