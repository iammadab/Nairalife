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

// let baseFindOneWith = userDb.findOneWith
// userDb.findOneWith = function(query){
// 	return baseFindOneWith(query, { password: 0 })
// }

// let baseFindOne = userDb.findOne
// userDb.findOne = function(query){
// 	return baseFindOne(query, { password: 0 })
// }

module.exports = userDb