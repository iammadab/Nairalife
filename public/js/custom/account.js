let store = {
	verifyBankButton: document.querySelector(".verify-bank-button"),
	bankFormTag: ".bank-form",
	bankFormInputs: Array.from(document.querySelectorAll(".bank-form input, .bank-form select")),
	bvnInput: document.querySelector(".bvn-input")
}

;(function attachEvent(){
	addEvent([store.verifyBankButton], "click", verifyBank)
	addEvent(store.bankFormInputs, "input,focus", () => hideAlert("bank-error"))
	addEvent(store.bankFormInputs, "input,focus", () => hideAlert("fee-success"))
	addEvent([store.bvnInput], "input,focus", () =>showAlert("bvn-warn"))
	addEvent([store.bvnInput], "input,focus", () => hideAlert("fee-success"))
})()	

const verifyButton = createButton(".verify-text", "Add Account", "Verifying...")

function verifyBank(event){
	let nameMap = {
		account_number: "enter your account number",
		bank_code: "select your bank",
		bvn: "enter your bank verification number"
	}
	event.preventDefault()
	verifyButton()
	let bankDetails = extractForm(store.bankFormTag)
	let missingDetails = hasKeys(bankDetails, ["account_number", "bank_code", "bvn"])

	if(missingDetails.length > 0){
		verifyButton("normal")
		return showAlert("bank-error", `Sorry, you didn't ${nameMap[missingDetails[0]]}`)
	}

	let { account_number, bank_code } = bankDetails
	return api("bank/verify", { account_number, bank_code, token: getToken() })
			.then(handleResponse)

	function handleResponse(response){
		// console.log(response)
		if(response.status == 200)
			return sendBvn(bankDetails.bvn)
		else if(response.code == "ACCOUNT_VERIFICATION_FAILED")
			showAlert("bank-error", response.message)
		else if(reponse.code == "FAILED_IDENTITY_TEST")
			showAlert("bank-error", "Sorry, your bvn and account number don't match")
		verifyButton("normal")
	}
}

function sendBvn(bvn){
	return api("bvn/verify", { bvn, token: getToken() })
			.then(handleResponse)

	function handleResponse(response){
		// console.log(response)
		if(response.status == 200)
			return redirect("/loan")
		else if(response.code == "BVN_MUST_BE_11_DIGITS")
			showAlert("bank-error", "Bvn number must be 11 digits long")
		else if(response.code == "BVN_VERIFICATION_FAILED")
			showAlert("bank-error", response.message)
		else if(response.code == "FAILED_IDENTITY_TEST")
			showAlert("bank-error", "Sorry, your bvn and account number don't match")
		verifyButton("normal")
	}	
}