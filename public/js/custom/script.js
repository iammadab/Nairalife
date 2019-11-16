/*
	Contents
	--------
	showView
	showError
	hideError
	hasKeys
	extractForm
	addEvent
*/

function showView(viewName){
	let viewToShow = document.querySelector(`#${viewName}`)
	if(!viewToShow) return
	let visibleViews = Array.from(document.querySelectorAll(".view.show"))
	visibleViews.forEach(view => view.classList.remove("show"))
	viewToShow.classList.add("show")
}

function showError(errorName, errorMessage){
	let errorBox = document.querySelector(`.${errorName}`),
		errorText = document.querySelector(`.${errorName} .alert-text`)

	if(errorBox)
		errorBox.style.display = "flex" 

	if(errorText)
		errorText.innerText = errorMessage
}

function hideError(errorName){
	let errorBox = document.querySelector(`.${errorName}`)
	if(errorBox)
		errorBox.style.display = "none"
}

function hasKeys(obj, expectedKey){
	let objKeys = Object.keys(obj)
	return expectedKey.filter(key => {
		return objKeys.includes(key) ? false : true
	})
}

function extractForm(formId){
	let inputs = Array.from(document.querySelectorAll(`${formId} input, ${formId} textarea`)), formData = {}
	inputs.forEach(input => {
		if(input.name && input.value)
			formData[input.name] = input.value
	})
	return formData
}

function addEvent(elements, eventString, cb){
	let events = eventString.split(",").map(evt => evt.trim())
	elements.forEach(element => {
		events.forEach(event => {
			if(!element) console.log("Can't find", element)
			else element.addEventListener(event, cb)
		})
	})
}