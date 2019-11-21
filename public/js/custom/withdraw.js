let store = {
	withdrawButton: document.querySelector(".withdraw-button")
}

;(function attachEvents(){
	addEvent([store.withdrawButton], "click", withdrawFunds)
})()

function withdrawFunds(event){
	event.preventDefault()
}