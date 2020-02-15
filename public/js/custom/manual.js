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

	return api("payment/manual", { amount: paymentDetails.amount, token: getToken() })
					.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200)
			redirect(response.redirect_url)
		else if(response.code == "NEGATIVE_AMOUNT")
			showAlert("pay-error", "Your amount cannot be negative")
	}
}