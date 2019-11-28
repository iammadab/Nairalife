let store = {
	payMemberButton: document.querySelector("pay-member-button"),
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
	console.log("Paying the member")
}