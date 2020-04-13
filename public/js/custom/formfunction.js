function createFormFunction({ form, error, button, api, handlers }){
	return function(){

		let store = {
			form,
			error,
			button,
			api,
			handlers,
			inputs: Array.from(document.querySelectorAll(`${form} input, ${form} textarea, ${form} select`)),
			button: document.querySelector(button.main),
			activeButton: getActiveButton(button.text, button.active)
		}

		;(function attachEvents(){
			addEvent([store.button], "click", mainFunc)
			addEvent(store.inputs, "input,focus", () => hideAlert(store.error))
		})

		function mainFunc(event){
			event.preventDefault()

			store.activeButton()

			let formDetails = extractForm(store.form.main)
			let missingDetails = hasKeys(formDetails, store.form.values)
			if(missingDetails.length > 0){
				store.activeButton("normal")
				return showAlert(store.error, `Sorry, you didn't enter your ${missingDetails[0]}`)
			}

			let apiDetails = grabDetails(store.api.data, formDetails)
			return api(store.api.route, apiDetails)
							.then(createHandler(handlers, store))
		}
	}
}

function getActiveButton(buttonTextClass, changeValue){
	let buttonTextObj = document.querySelector(buttonTextClass)
	return createButton(buttonTextClass, buttonTextObj.value, changeValue)
}

function grabDetails(props, dataObj){
	return props.map(prop => {
		if(prop == "token")
			return getToken()
		return dataObj[prop]
	})
}

function createHandler(handlers, store){
	return function(response){
		console.log("Handling")
		if(response.status == 200 && handlers["200"])
			execAction(handlers["200"], store)
		else if(response.code && handlers[response.code])
			execAction(handlers[response.code], store)
		else
			console.log("Found no handlers")
	}
}

function execAction(action, store){
	let [command, info] = action.split(":")
	if(command == "redirect")
		return redirect(info)
	else if(command == "error")
		showAlert(store.error, info)
	else if(command == "view")
		showView(info)
	store.activeButton("normal")
}