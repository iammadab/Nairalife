const createDb = require("./base.db")
const groupModel = require("../models/group.model")
const groupDb = createDb(groupModel)

module.exports = groupDb