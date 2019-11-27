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

let createGroupButton = createButton(".create-text", "Create Group", "Creating group...")
function createGroup(event){
	event.preventDefault()
	createGroupButton()
	let groupDetails = extractForm(store.createGroupFormTag)
	let missingDetails = hasKeys(groupDetails, ["group_title", "group_description", "group_goals", "total_members", "contribution_amount", "contribution_period"])
	if(missingDetails.length > 0){
		createGroupButton("normal")
		return showAlert("create-error", `Sorry, you didn't enter ${missingDetails[0]}`)
	}

	return api("group", { ...groupDetails, token: getToken("atoken") })
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200){
			showAlert("create-success", "Group created successfully")
			store.createGroupInputs.forEach(input => input.value = "")
		}
		createGroupButton("normal")
	}
}