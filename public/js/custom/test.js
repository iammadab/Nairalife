const loginFunction = createFormFunction({
	data:{
		form: {
			main: ".form-class",
			values: ["phone", "mail"]
		},
		error: ".error-class",
		button: {
			main: ".button-class",
			text: ".button-text-class",
			active: "Verifying..."
		}
	},
	api: {
		type: "post",
		route: "/profile",
		data: ["phone", "password", "token"]
	},
	handlers:{
		200: "redirect:/profile/main"
	}
})

loginFunction()