let store = {
	saveButtons: document.querySelectorAll(".save-button")
}

;(function attachEvents(){
	addEvent(store.saveButtons, "click", chargeLoan)
})()

function chargeLoan(event){
	event.preventDefault()
	let user_id = event.target.dataset.user_id,
			loan_id = event.target.dataset.loan_id

	// Create a dynamic charge button
	let chargeButton = createButton(`.save-button-text-${user_id}`, "Charge", "Charging...")
	chargeButton()

	return api("admin/charge/loan", { atoken: getToken("atoken"), user_id, loan_id  })
					.then(handleResponse)

	function handleResponse(response){
		console.log(response)
		if(response.status == 200){
			event.target.classList.add("otp-error")
			event.target.nextElementSibling.classList.remove("otp-error")
		}
		chargeButton("normal")
	}
}