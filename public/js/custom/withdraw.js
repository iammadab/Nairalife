let store = {
	withdrawButton: document.querySelector(".withdraw-button"),
	withdrawFormTag: ".withdraw-form",
	withdrawInputs: Array.from(document.querySelectorAll(".withdraw-form input")),
	passwordInput: document.querySelector(".password-box")
}

;(function attachEvents(){
	addEvent([store.withdrawButton], "click", withdrawFunds)
	addEvent(store.withdrawInputs, "input,focus", () => hideAlert("withdraw-error"))
	addEvent(store.withdrawInputs, "input,focus", () => hideAlert("withdraw-success"))
})()

let withdrawButton = createButton(".withdraw-text", "Withdraw", "Withdrawing...")

let endState = () => { withdrawButton("normal"); store.passwordInput.value = "" }

function withdrawFunds(event){
	let nameMap = {
		amount: "enter the amount of money you want to withdraw",
		password: "enter your Nairalife account password"
	}	
	event.preventDefault()
	withdrawButton()
	let withdrawDetails = extractForm(store.withdrawFormTag)
	let missingDetails = hasKeys(withdrawDetails, ["amount", "password"])
	if(missingDetails.length > 0){
		endState()
		return showAlert("withdraw-error", `You didn't ${nameMap[missingDetails[0]]}`)
	}

	let { amount, password } = withdrawDetails
	return api("user/withdraw", { amount, password, token: getToken() })
		.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200){
			showAlert("withdraw-success", "Withdrawal was successful")
			store.withdrawInputs.forEach(input => input.value = "")
		}
		else if(response.code == "INVALID_PASSWORD")
			showAlert("withdraw-error", "Please enter the correct password for your Nairalife account")
		else if(response.code == "NEGATIVE_AMOUNT")
			showAlert("withdraw-error", "Sorry, you entered a negative amount")
		else if(response.code == "CAN_NOT_WITHDRAW_ZERO")
			showAlert("withdraw-error", "Sorry, you cannot withdraw anything less than &#8358;1,000")
		else if(response.code == "INSUFFICIENT_BALANCE")
			showAlert("withdraw-error", "Sorry, you currently don't have up to this amount in your available balance")
		else if(response.code == "BANK_NOT_ADDED")
			showAlert("withdraw-error", "Sorry, you have not added your bank on Nairalife")
		else
			showAlert("withdraw-error", "Sorry, Nairalife withdrawal failed. Try again later or contact us")
		endState()
	}
}