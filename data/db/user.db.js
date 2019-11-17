const createDb = require("./base.db")
const userModel = require("../models/user.model")
const userDb = createDb(userModel)

userDb.createUser = function({ fullname, phone, email, password }){
	let newUser = new userModel({
		fullname,
		phone,
		email,
		password
	})

	return newUser.save()
}

module.exports = userDb