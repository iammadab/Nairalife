let store = {
	cancelButton: document.querySelector(".transaction-cancel"),
	confirmButton: document.querySelector(".transaction-confirm")
}

;(function attachEvent(){
	addEvent([store.cancelButton], "click", cancelTransaction)
	addEvent([store.confirmButton], "click", confirmTransaction)
})()

let cancelButton = createButton(".cancel-text", "Cancel Payment", "Cancelling...")
let confirmButton = createButton(".confirm-text", "Confirm Payment", "Confirming...")

function cancelTransaction(event){
	event.preventDefault()
	cancelButton()
	let transaction_id = store.cancelButton.dataset.transaction_id

	return api("transaction/decline", { transaction_id: transaction_id, token: getToken("atoken") })
					.then(handleResponse)
}

function confirmTransaction(event){
	event.preventDefault()
	confirmButton()
	let transaction_id = store.confirmButton.dataset.transaction_id

	return api("transaction/approve", { transaction_id: transaction_id, atoken: getToken("atoken")})
					.then(handleResponse)
}

function handleResponse(response){
	if(response.status == 200)
		return reload()
	disableButtons()
}

function disableButtons(){
	cancelButton("normal")
	confirmButton("normal")
}