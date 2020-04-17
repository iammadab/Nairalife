let store = {
	cancelButton: document.querySelector(".cancel-button")
}

;(function attachEvents(){
	addEvent([store.cancelButton], "click", cancelLoan)
})()

function cancelLoan(event){
	event.preventDefault()
	let loan_id = event.target.dataset.loan_id

	return api("loan/cancel", { token: getToken(), loan_id })
					.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200)
			reload()
	}
}