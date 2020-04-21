let store = {
	approveButton: document.querySelector(".approve-loan"),
	denyButton: document.querySelector(".deny-loan")
}

;(function attachEvents(){
	addEvent([store.approveButton], "click", createHandler(store.approveButton, "loan/approve"))
	addEvent([store.denyButton], "click", createHandler(store.denyButton, "loan/decline"))
})()

function createHandler(button, route, buttonClass, normal, changeText){
	return function(event){

		event.preventDefault()
		let loan_id = button.dataset.loan_id

		return api(route, { atoken: getToken("atoken"), loan_id })
						.then(handleResponse)

		function handleResponse(response){
			if(response.status == 200)
				reload()
		}

	}
}