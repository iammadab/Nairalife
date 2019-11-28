let store = {
	addPointsButton: document.querySelector(".add-points-button"),
	addPointsFormTag: ".add-points-form",
	addPointsInputs: document.querySelectorAll(".add-points-form input, .add-points-form select, .add-points-form textarea")
}

;(function attachEvents(){
	addEvent([store.addPointsButton], "click", addPoints)
	addEvent(store.addPointsInputs, "input,focus", () => hideAlert("add-points-error"))
	addEvent(store.addPointsInputs, "input,focus", () => hideAlert("add-points-success"))
})()

function addPoints(event){
	event.preventDefault()
	let addPointDetails = extractForm(store.addPointsFormTag)
	let missingDetails = hasKeys(addPointDetails, ["user_id", "type", "comment", "points"])
	if(missingDetails.length > 0)
		return showAlert("add-points-error", `You didn't fill data for ${missingDetails[0]}`)
}