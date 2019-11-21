let store = {
	withdrawButton: document.querySelector(".withdraw-button"),
	withdrawFormTag: ".withdraw-form",
	withdrawInputs: Array.from(document.querySelectorAll(".withdraw-form input"))
}

;(function attachEvents(){
	addEvent([store.withdrawButton], "click", withdrawFunds)
	addEvent(store.withdrawInputs, "input,focus", () => hideAlert("withdraw-error"))
	addEvent(store.withdrawInputs, "input,focus", () => hideAlert("withdraw-success"))
})()

function withdrawFunds(event){
	event.preventDefault()
	let withdrawDetails = extractForm(store.withdrawFormTag)
	let missingDetails = hasKeys(withdrawDetails, ["amount"])
	if(missingDetails.length > 0)
		return showAlert("withdraw-error", `You didn't fill data for ${missingDetails[0]}`)
}