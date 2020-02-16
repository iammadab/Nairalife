let store = {
	cancelButton: document.querySelctor("transaction-cancel"),
	confirmButton: document.querySelctor("transaction-confirm")
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