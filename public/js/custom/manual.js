let store = {
	manualPayButton: document.querySelector(".manual-pay-button"),
	paymentFormTag: ".manual-form",
	manualPayInputs: Array.from(document.querySelectorAll(".manual-form input"))
}

;(function attachEvent(){
	addEvent([store.manualPayButton], "click", makeManualPayment)
	addEvent(store.manualPayInputs, "input,focus", () => hideAlert("pay-error"))
})()

function makeManualPayment(event){
	event.preventDefault()

	let paymentDetails = extractForm(store.paymentFormTag)
	let missingDetails = hasKeys(paymentDetails, ["amount"])

	if(missingDetails.length > 0)
		return showAlert("pay-error", "Sorry, you didn't enter an amount")

	console.log(missingDetails)
}