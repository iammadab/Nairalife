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