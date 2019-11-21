let store = {
	withdrawButton: document.querySelector(".withdraw-button"),
	withdrawFormTag: ".withdraw-form",
	withdrawInputs: Array.from(document.querySelectorAll(".withdraw-form input"))
}

;(function attachEvents(){
	addEvent([store.withdrawButton], "click", withdrawFunds)
})()

function withdrawFunds(event){
	event.preventDefault()
	let withdrawDetails = extractForm(store.withdrawFormTag)
	console.log(withdrawDetails)
}