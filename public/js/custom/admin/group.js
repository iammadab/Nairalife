let store = {
	removeButtons: document.querySelectorAll(".remove-member"),
	restartButton: document.querySelector(".restart-cycle-button"),
	contributionsButton: document.querySelector(".get-contribution-button")
}

;(function attachEvents(){
	addEvent(store.removeButtons, "click", removeMember)
	addEvent([store.restartButton], "click", restartCycle)
	addEvent([store.contributionsButton], "click", getContributions)
})()

function removeMember(event){
	event.preventDefault()
	let allowed = confirm("Are you sure you want to remove this user?")
	if(!allowed) return

	let { group_id, user_id } = event.target.dataset
	
	return api("group/member/remove", { group_id, user_id, token: getToken("atoken") })
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200)
			redirect(window.location.href)
		else
			console.log(response.code)
	}

}


function restartCycle(event){
	event.preventDefault()
	let { group_id } = store.restartButton.dataset
	if(!group_id) return console.log("No group id. Contact support")

	return api("group/cycle", { token: getToken("atoken"), group_id })
			.then(handleResponse)

	function handleResponse(response){
		console.log(response)
		if(response.status == 200)
			redirect("/admin/groups")
	}
}

function getContributions(event){
	event.preventDefault()
	console.log("Fetching contributions")
}