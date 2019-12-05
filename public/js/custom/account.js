let store = {
	verifyBankButton: document.querySelector(".verify-bank-button"),
	bankFormTag: ".bank-form",
	bankFormInputs: Array.from(document.querySelectorAll(".bank-form input, .bank-form select"))
}

;(function attachEvent(){
	addEvent([store.verifyBankButton], "click", verifyBank)
	addEvent(store.bankFormInputs, "input,focus", () => hideAlert("bank-error"))
})()	

const verifyButton = createButton(".verify-text", "Verify Bank", "Verifying...")

function verifyBank(event){
	let nameMap = {
		account_number: "enter your account number",
		bank_code: "select your bank",
		bvn: "enter your bank verification number"
	}
	event.preventDefault()
	verifyButton()
	let bankDetails = extractForm(store.bankFormTag)
	// let missingDetails = hasKeys(bankDetails, ["account_number", "bank_code", "bvn"])
	let missingDetails = hasKeys(bankDetails, ["account_number", "bank_code"])

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
			return redirect("/about")
		else if(response.code == "ACCOUNT_VERIFICATION_FAILED")
			return showAlert("bank-error", response.message)
		verifyButton("normal")
	}
}


// During the higher purchase version, 
// function sendBvn(bvn){
// 	return api("bvn/verify", { bvn, token: getToken() })
// 			.then(handleResponse)

// 	function handleResponse(response){
// 		// console.log(response)
// 		if(response.status == 200)
// 			return redirect("/about")
// 		else if(response.code == "BVN_MUST_BE_11_DIGITS")
// 			showAlert("bank-error", "Bvn number must be 11 digits long")
// 		else if(response.code == "BVN_VERIFICATION_FAILED")
// 			showAlert("bank-error", response.message)
// 		verifyButton("normal")
// 	}	
// }