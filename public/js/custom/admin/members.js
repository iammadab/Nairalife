let store = {
	approveButtons: Array.from(document.querySelectorAll(".approve-button"))
}

;(function attachEvents(){
	addEvent(store.approveButtons, "click", approveUser)
})()

function approveUser(event){
	event.preventDefault()
	let button = event.target, user_id = button.dataset.user_id
	let stageElement = document.querySelector(`.user-stage-${user_id}`)

	button.innerText = "Approving..."
	api("admin/user/approve", { atoken: getToken("atoken"), user_id: user_id })
		.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200){
			stageElement.innerText = "Verified"
			return removeButton(button)
		}
		else
			button.innerText = "Approve"
	}
}

function removeButton(button){
	button.style.display = "none"
}