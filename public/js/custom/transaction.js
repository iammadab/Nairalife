let store = {
	cancelButton: document.querySelector(".transaction-cancel")
}

;(function attachEvent(){
	addEvent([store.cancelButton], "click", cancelTransaction)
})()

function cancelTransaction(event){
	event.preventDefault()
	
}