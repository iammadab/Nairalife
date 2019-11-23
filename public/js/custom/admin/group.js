let store = {
	removeButtons: document.querySelectorAll(".remove-member")
}

;(function attachEvents(){
	addEvent(store.removeButtons, "click", removeMember)
})()

function removeMember(event){
	event.preventDefault()
	let allowed = confirm("Are you sure you want to delete this user?")
	if(!allowed) return
		
	let { group_id, user_id } = event.target.dataset

}