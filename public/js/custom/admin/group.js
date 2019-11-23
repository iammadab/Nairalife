let store = {
	removeButtons: document.querySelectorAll(".remove-member")
}

;(function attachEvents(){
	addEvent(store.removeButtons, "click", removeMember)
})()

function removeMember(event){
	event.preventDefault()
	let { group_id, user_id } = event.target.dataset
}