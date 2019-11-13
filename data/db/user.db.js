const createDb = require("./base.db")
const userModel = require("../models/user.model")
const userDb = createDb(userModel)

module.exports = userDb