let store = {
	verifyBankButton: document.querySelector(".verify-bank-button"),
	bankFormTag: ".bank-form",
	bankFormInputs: Array.from(document.querySelectorAll(".bank-form input, .bank-form select")),
	bvnInput: document.querySelector(".bvn-input")
}

;(function attachEvent(){
	addEvent([store.verifyBankButton], "click", verifyBank)
	addEvent(store.bankFormInputs, "input,focus", () => hideAlert("bank-error"))
	addEvent([store.bvnInput], "input,focus", () =>showAlert("bvn-warn"))
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
		// console.log(response)
		if(response.status == 200)
			sendBvn(bankDetails.bvn)
		else if(response.code == "ACCOUNT_VERIFICATION_FAILED")
			return showAlert("bank-error", response.message)
	}
}

function sendBvn(bvn){
	return api("bvn/verify", { bvn, token: getToken() })
			.then(handleResponse)

	function handleResponse(response){
		console.log(response)
		if(response.status == 200)
			redirect("/about")
		else if(response.code == "BVN_MUST_BE_11_DIGITS")
			return showAlert("bank-error", "Bvn number must be 11 digits long")
		else if(response.code == "BVN_VERIFICATION_FAILED")
			return showAlert("bank-error", response.message)
	}	
}