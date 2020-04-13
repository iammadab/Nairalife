let fields = ["partner", "work_duration", "rating", "trips", "city", "work_description", "own_car", "weekly_earning", "reason"]
let businessFunction = createFormFunction({
	form: {
		main: ".business-form",
		values: fields
	},
	button: {
		main: ".business-submit",
		text: ".business-text",
		active: "Adding Business..."
	},
	error: ".business-error",
	request: {
		route: "user/business",
		data: ["token", ...fields]
	},
	handlers: {
		200: "redirect:docs"
	}
})

businessFunction()