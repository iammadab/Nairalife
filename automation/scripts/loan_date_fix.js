const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, "../../", ".env") })

const { connectToDb } = require("../../runners/database_runner")
const loanDb = require("../../data/db/loan.db")
const { addWeeks } = require("../../lib/date")

// connectToDb()
	// .then(getApprovedLoans)
	// .then(addStartDate)
	.then(exit)


async function getApprovedLoans(){
	return loanDb.findWith({ status: "approved" })
}

async function addStartDate(loans){
	// let startDateUpdateStatus = await Promise.all(
	// 	loans.map(loan => {
	// 		let startDate = addWeeks(loan.created_at, loan.weeks_before_payment)
	// 		return loanDb.appendDoc({ _id: loan._id }, "started_at", startDate)
	// 	})
	// )
	console.log(startDateUpdateStatus)
	
	loans.forEach(loan => {
		console.log("Created_at", loan.created_at.toLocaleString())
		console.log("Weeks before", loan.weeks_before_payment)
		let startDate = addWeeks(loan.created_at, loan.weeks_before_payment)
		// console.log(loan.start_date, startDate)
		console.log("Start date", startDate.toLocaleString())
		console.log("")
	})
}

async function getAllLoans(){
	let allLoans = await loanDb.findWith({})
	return allLoans
}

async function updateDate(loans){
	// let loanUpdateStatus = await Promise.all(
	// 	loans.map(loan => {
	// 		return loanDb.appendDoc({ _id: loan._id }, "created_at", loan._id.getTimestamp())
	// 	})
	// )

	// console.log(loanUpdateStatus)

	loans.forEach(loan => console.log(loan.created_at))
}

function exit(){
	process.exit(0)
}