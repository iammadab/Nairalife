let fields = ["initial_amount", "reason", "weeks", "weeks_before_payment"]
let loanFunction = createFormFunction({
	form: {
		main: ".loan-form",
		values: fields
	},
	button: {
		main: ".loan-submit",
		text: ".loan-text",
		active: "Requesting..."
	},
	error: ".loan-error",
	request: {
		route: "loan/",
		data: ["token", ...fields]
	},
	handlers: {
		PENDING_LOAN: "error:You already have a pending loan"
	},
	nameMap: {
		// Assume each error is prefaced with "Sorry, you didn't"
		initial_amount: "enter how much you need",
		reason: "enter what you need the money for",
		weeks: "choose how long you want to pay",
		weeks_before_payment: "choose when you want to start payment"
	}
})

loanFunction()

let store = {
	initial_amount_element: document.querySelector("input[name=initial_amount]"),
	weeks_element: document.querySelector("select[name=weeks]"),
	weeks_before_payment: document.querySelector("select[name=weeks_before_payment]"),
	plan_box: document.querySelector(".plan-alert")
}

;(function attachEvent(){
	let { initial_amount_element, weeks_before_payment, weeks_element } = store
	addEvent([initial_amount_element, weeks_element, weeks_before_payment], "input,foucs", newInput)
})()

function newInput(event){
	event.preventDefault()
	let { initial_amount_element, weeks_before_payment, weeks_element } = store
	if(!(initial_amount_element.value && weeks_before_payment.value && weeks_element.value)){
		store.plan_box.innerHTML = ""
		return
	}
		

	api("loan/calculate", { 
		token: getToken(),
		initial_amount: initial_amount_element.value,
		weeks: weeks_element.value,
		weeks_before_payment: weeks_before_payment.value
	}).then(handleResponse)

	function handleResponse(response){
		if(response.status == 200)
			renderResponse(response)
	}

	function renderResponse(data){
		let responseHTML = `
			<div class="alert-text text-muted">
				If your request is approved, you will pay back on instalment 
				<span class="kt-font-bolder">&#8358;${data.weeklyPayments}</span> 
				weekly for ${data.weeks} weeks for a total of 
				<span class="kt-font-bolder">&#8358;${data.finalAmount}</span> 
				and at an interest rate of ${data.interest}%.
			</div>	
		`

		store.plan_box.innerHTML = responseHTML
	}
}