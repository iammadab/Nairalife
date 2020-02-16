const changeStatus = require("./transaction.changeStatus")
const approve = require("./transaction.approve")
const decline = require("./transaction.decline")

let transactionServices = {
	changeStatus,
	approve,
	decline
}

module.exports = transactionServices