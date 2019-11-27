const createDb = require("./base.db")
const pointModel = require("../models/point.model")
const pointDb = createDb(pointModel)

module.exports = pointDb