let store = {
	payMemberButton: document.querySelector(".pay-member-button"),
	payMemberFormTag: ".pay-member-form",
	payMemberInputs: document.querySelectorAll(".pay-member-form input")
}

;(function attachEvents(){
	addEvent([store.payMemberButton], "click", payMember)
	addEvent(store.payMemberInputs, "input,focus", () => hideAlert("pay-error"))
	addEvent(store.payMemberInputs, "input,focus", () => hideAlert("pay-success"))
})()

const payButton = createButton(".pay-member-text", "Pay Member", "Paying member...")
function payMember(event){
	event.preventDefault()
	let payDetails = extractForm(store.payMemberFormTag)
	let missingDetails = hasKeys(payDetails, ["user_id", "amount"])
	if(missingDetails.length > 0)
		return showAlert("pay-error", `You didn't fill data for ${missingDetails[0]}`)

	payDetails.token = getToken("atoken")
	return api("user/balance", payDetails)
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200){
			showAlert("pay-success", "Payed member successfully")
			store.payMemberInputs.forEach(input => input.value = "")
		}
		else if(response.code == "USER_NOT_FOUND")
			showAlert("pay-error", "No user found for that user id")
		else if(response.code == "PROBLEM_ADDING_BALANCE")
			showAlert("pay-error", "Problem paying member. Contact Support")
	}
}