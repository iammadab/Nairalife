const createDb = require("./base.db")
const userModel = require("../models/user.model")
const userDb = createDb(userModel)

userDb.createUser = function({ fullname, phone, email, password, user_id }){
	let newUser = new userModel({
		fullname,
		phone,
		email,
		password,
		user_id
	})

	return newUser.save()
}

module.exports = userDb