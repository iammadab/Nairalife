let store = {
	verifyBankButton: document.querySelector(".verify-bank-button"),
	bankFormTag: ".bank-form",
	bankFormInputs: Array.from(document.querySelectorAll(".bank-form input, .bank-form select"))
}

;(function attachEvent(){
	addEvent([store.verifyBankButton], "click", verifyBank)
})()	

function verifyBank(event){
	event.preventDefault()
	let bankDetails = extractForm(store.bankFormTag)
	let missingDetails = hasKeys(bankDetails, ["account_number", "bank_code", "bvn"])
	if(missingDetails.length > 0)
		return showAlert("bank-error", `You didn't fill data for ${missingDetails[0]}`)

	let { account_number, bank_code, bvn } = bankDetails
	return api("bank/verify", { account_number, bank_code, bvn, token: getToken() })
			.then(handleResponse)

	function handleResponse(response){
		console.log(response)
		if(response.status == 200)
			redirect("/home")
	}
}