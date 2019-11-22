let store = {
	createGroupButton: document.querySelector(".create-group-button"),
	createGroupFormTag: ".create-form",
	createGroupInputs: document.querySelectorAll(".create-form input, .create-form select, .create-form textarea")
}

;(function attachEvents(){
	addEvent([store.createGroupButton], "click", createGroup)
	addEvent(store.createGroupInputs, "input,focus", () => hideAlert("create-error"))
	addEvent(store.createGroupInputs, "input,focus", () => hideAlert("create-success"))
})()

function createGroup(event){
	event.preventDefault()
	let groupDetails = extractForm(store.createGroupFormTag)
	let missingDetails = hasKeys(groupDetails, ["group_title", "group_description", "group_goals", "total_members", "contribution_amount", "contribution_period"])
	if(missingDetails.length > 0)
		return showAlert("create-error", `You didn't fill data for ${missingDetails[0]}`)

	return api("group", { ...groupDetails })
			.then(handleResponse)

	function handleResponse(response){
		console.log(response)
		if(response.status == 200){
			showAlert("create-success", "Group created successfully")
			store.createGroupInputs.forEach(input => input.value = "")
		}
	}
}