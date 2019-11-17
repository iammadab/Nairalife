let store = {
	loginButton: document.querySelector(".login-button")	
}

;(function attachEvents(){
	addEvent([store.loginButton], "click", startLogin)
})()

function startLogin(event){
	event.preventDefault()
}