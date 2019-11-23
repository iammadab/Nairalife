let store = {
	removeButtons: document.querySelectorAll(".remove-member")
}

;(function attachEvents(){
	addEvent(store.removeButtons, "click", removeMember)
})()

function removeMember(event){
	event.preventDefault()
	let allowed = confirm("Are you sure you want to remove this user?")
	if(!allowed) return

	let { group_id, user_id } = event.target.dataset
	
	return api("group/member/remove", { group_id, user_id, token: getToken() })
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200)
			redirect(window.location.href)
		else
			console.log(response.code)
	}

}