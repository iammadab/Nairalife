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
	console.log("Verifying bank")
}