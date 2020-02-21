let store = {
	cancelButton: document.querySelector(".transaction-cancel")
}

;(function attachEvent(){
	addEvent([store.cancelButton], "click", cancelTransaction)
})()

let cancelButton = createButton(".cancel-text", "Cancel Payment", "Cancelling...")

function cancelTransaction(event){
	event.preventDefault()
	cancelButton()

	let transaction_id = store.cancelButton.dataset.transaction_id

	return api("transaction/decline", { transaction_id: transaction_id, token: getToken() })
					.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200)
			return reload()
		cancelButton("normal")
	}
}