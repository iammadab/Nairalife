/*
	Contents
	showView
	showError
	hideError
	hasKeys
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