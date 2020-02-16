let store = {
	cancelButton: document.querySelector(".transaction-cancel"),
	confirmButton: document.querySelector(".transaction-confirm")
}

;(function attachEvent(){
	addEvent([store.cancelButton], "click", cancelTransaction)
	addEvent([store.confirmButton], "click", confirmTransaction)
})()

function cancelTransaction(event){
	event.preventDefault()
	console.log("Canceling transaction")
}

function confirmTransaction(event){
	event.preventDefault()
	console.log("Confirming transaction")
}