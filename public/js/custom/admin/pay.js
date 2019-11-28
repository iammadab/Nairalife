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
		console.log(response)
	}
}