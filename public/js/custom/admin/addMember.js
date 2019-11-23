let store = {
	addMemberButton: document.querySelector(".add-member-button"),
	addMemberFormTag: ".add-member-form",
	addMemberInputs: document.querySelectorAll(".add-member-form input")
}

;(function attachEvents(){
	addEvent([store.addMemberButton], "click", addMember)
	addEvent(store.addMemberInputs, "input,focus", () => hideAlert("member-error"))
	addEvent(store.addMemberInputs, "input,focus", () => hideAlert("member-success"))
})()

function addMember(event){
	event.preventDefault()
	let addDetails = extractForm(store.addMemberFormTag)
	let missingDetails = hasKeys(addDetails, ["user_id", "group_id"])
	if(missingDetails.length > 0)
		return showAlert("member-error", `You didn't fill data for ${missingDetails[0]}`)

	return api("group/member", { token: getToken(), ...addDetails })
			.then(handleResponse)

	function handleResponse(response){
		if(response.status == 200){
			showAlert("member-success", "Added user to group successfully")
			store.addMemberInputs.forEach(input => input.value = "")
		}
		else if(response.code == "USER_DOES_NOT_EXIST")
			showAlert("member-error", "No user found for that id")
		else if(response.code == "GROUP_DOES_NOT_EXIST")
			showAlert("member-error", "No group found for that id")
		else if(response.code == "USER_HAS_GROUP")
			showAlert("member-error", "The user already belongs to a group")
		else if(response.code == "PROBLEM_ADDING_USER")
			showAlert("member-error", "Problem adding user. Contact support")
	}
}