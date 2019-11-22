let store = {
	createGroupButton: document.querySelector(".create-group-button"),
	createGroupFormTag: ".create-form",
	createGroupInputs: document.querySelectorAll(".create-form input, .create-form select, .create-form textarea")
}

;(function attachEvents(){
	addEvent([store.createGroupButton], "click", createGroup)
})()

function createGroup(event){
	event.preventDefault()
	console.log("Creating group")
}