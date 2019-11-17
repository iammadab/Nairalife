const createDb = require("./base.db")
const otpModel = require("../models/otp.model")

const otpDb = createDb(otpModel)

module.exports = otpDb