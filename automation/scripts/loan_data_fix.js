const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, "../../", ".env") })

const { connectToDb } = require("../../runners/database_runner")
const loanDb = require("../../data/db/loan.db")

connectToDb()
	.then(getAllLoans)
	.then(updateDate)
	.then(console.log)
	.then(exit)

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