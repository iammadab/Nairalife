let store = {
	guarantorButton: document.querySelector(".guarantor-button"),
	guarantorFormTag: ".guarantor-form"
}

;(function attachEvents(){
	addEvent([store.guarantorButton], "click", submitGuarantor)
})()

function submitGuarantor(event){
	event.preventDefault()
	
	let guarantorDetails = extractForm(store.guarantorFormTag)
}