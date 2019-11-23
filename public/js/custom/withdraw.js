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

let withdrawButton = createButton(".withdraw-text", "Withdraw", "Withdrawing...")

function withdrawFunds(event){
	event.preventDefault()
	withdrawButton()
	let withdrawDetails = extractForm(store.withdrawFormTag)
	let missingDetails = hasKeys(withdrawDetails, ["amount", "password"])
	if(missingDetails.length > 0){
		withdrawButton("normal")
		return showAlert("withdraw-error", `You didn't fill data for ${missingDetails[0]}`)
	}

	let { amount, password } = withdrawDetails
	console.log(amount, password)
	return api("user/withdraw", { amount, password, token: getToken() })
			.then(handleResponse)

	function handleResponse(response){
		console.log("got response")
		console.log(response)
		if(response.status == 200){
			showAlert("withdraw-success", "Withdrawal was successful")
			store.withdrawInputs.forEach(input => input.value = "")
		}
		else if(response.code == "INVALID_PASSWORD")
			showAlert("withdraw-error", "Invalid Password")
		else if(response.code == "NEGATIVE_AMOUNT")
			showAlert("withdraw-error", "You entered a negative amount")
		else if(response.code == "INSUFFICIENT_BALANCE")
			showAlert("withdraw-error", "You don't have sufficient balance")
		else if(response.code == "BANK_NOT_ADDED")
			showAlert("withdraw-error", "You have not added your bank")
		else
			showAlert("withdraw-error", "Withdraw failed. Try again later or contact us")
		withdrawButton("normal")
	}
}