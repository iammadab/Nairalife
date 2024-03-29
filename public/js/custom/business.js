let fields = ["partner", "work_duration", "rating", "trips", "city", "work_description", "own_car", "weekly_earning"]
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
		200: "redirect:verification"
	},
	nameMap: {
		partner: "choose your partner",
		work_duration: "choose how long you have been driving for :[partner]",
		rating: "enter your rating",
		trips: "enter your total trips for :[partner]",
		city: "choose the city you drive in",
		work_description: "describe your partnership",
		own_car: "choose your car status",
		weekly_earning: "enter your average weekly earnings"
	}
})

businessFunction()