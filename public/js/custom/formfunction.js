function createFormFunction({ form, error, button, request, handlers, nameMap }){
	return function(){

		let store = {
			form,
			error,
			button,
			request,
			handlers,
			nameMap,
			inputs: Array.from(document.querySelectorAll(`${form.main} input, ${form.main} textarea, ${form.main} select`)),
			button: document.querySelector(button.main),
			activeButton: getActiveButton(button.text, button.active)
		}

		;(function attachEvents(){
			addEvent([store.button], "click", mainFunc)
			addEvent(store.inputs, "input,focus", () => hideAlert(store.error))
		})()

		function mainFunc(event){
			event.preventDefault()

			store.activeButton()

			let formDetails = extractForm(store.form.main), processString = processDynamic(formDetails)
			let missingDetails = hasKeys(formDetails, store.form.values)
			if(missingDetails.length > 0){
				store.activeButton("normal")
				let errorPlaceHolder = nameMap && nameMap[missingDetails[0]] ? nameMap[missingDetails[0]] : missingDetails[0]
				return showAlert(store.error, `Sorry, you didn't ${processString(errorPlaceHolder)}`)
			}

			let apiDetails = grabDetails(store.request.data, formDetails)
			return api(store.request.route, apiDetails)
							.then(createHandler(handlers, store))
		}
	}
}

function getActiveButton(buttonTextClass, changeValue){
	let buttonTextObj = document.querySelector(buttonTextClass)
	return createButton(buttonTextClass, buttonTextObj.innerText, changeValue)
}

function grabDetails(props, dataObj){
	let details = {}
	props.forEach(prop => {
		if(prop == "token")
			details["token"] = getToken()
		else
			details[prop] = dataObj[prop]
	})
	return details
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

function processDynamic(store){
	return function(text){
		let insertMatcher = /:\[(\w+)\]/g
		return text.replace(insertMatcher, (match, prop) => store[prop] || "")
	}		
}