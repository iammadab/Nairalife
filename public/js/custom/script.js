/*
	Contents
	--------
	toggleNav
	showView
	showError
	hideError
	hasKeys
	extractForm
	addEvent
	api
	redirect
	getCounter
	setValue
	getToken
	deleteCookie
*/

;(function toggleNav(){
    let topBarToggler = document.querySelector(".kt-header-mobile__toolbar-topbar-toggler")
    let landingToggle = document.querySelector(".landing-toggle")
    let userBar = document.querySelector(".user-dropdown")
    let landingDropdown = document.querySelector(".landing-dropdown")

    if(topBarToggler)
        topBarToggler.onclick = function(event){
            userBar.classList.toggle("show")
            userBar.classList.toggle("show-menu")
        }

    if(landingToggle)
        landingToggle.onclick = function(event){
            landingDropdown.classList.toggle("show")
            landingDropdown.classList.toggle("show-menu-landing")
        }
})()

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
	let selectString = `${formId} input, ${formId} textarea, ${formId} select`
	let inputs = Array.from(document.querySelectorAll(selectString)), formData = {}
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

function api(resourcePath, data){
	let url = `/api/${resourcePath}`
	if(!data) return fetch(url).then(response => response.json())
	return fetch(url, {
		method: "POST", 
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	}).then(response => response.json())
}

function redirect(url){
	window.location.href = url
}

function getCounter(seconds, cb, endcb){
	let counter = setInterval(callCb, 1000)
	function callCb(){
		seconds -= 1
		cb(toTimeString(seconds))
		if(seconds <= 0){
			clearInterval(counter)
			endcb()
		}
	}

	function toTimeString(seconds){
		let secondsValue = seconds % 60, minutesValue = (seconds - secondsValue) / 60
		return `${padZero(minutesValue)} : ${padZero(secondsValue)}`

		function padZero(val){
			return (("" + val).length == 1) ? "0" + val : val
		}
	}
}

function setValue(elements, value, condition){
	let prop = condition ? condition : "innerText"
	elements.forEach(element => {
		let domElement = document.querySelector(element)
		if(domElement)
			domElement[prop] = value
	})
}

function getToken(search){
	let param = search ? search : "token", token
	let cookieParts = document.cookie.split(";")
	cookieParts.forEach(cookie => {
		if(cookie.trim().indexOf(param) == 0)
			token = cookie.split("=")[1]
	})
	return token
}

function deleteCookie(cookieName){
	document.cookie = cookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;"
}