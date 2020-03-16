/*
	This should create a revenue report
	Ideally, we should see the revenue for each month
	Then the growth rate from the previous month
*/

const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, "../", ".env") })

const { connectToDb } = require("../runners/database_runner")
const transactionModel = require("../data/models/transaction.model")

/*
	To acheive this, I first need to split all the transactions into different month buckets
	The order of the transaction buckets also matter, so most likely an array of arrays
*/

async function generateReport(){
	console.log("Generating report")
	console.log(".................")

	let monthlyTransactions = await getTransactionsByMonth()
	let [monthlyRevenue, frequency] = await getRevenue(monthlyTransactions)
	let growthRates = []

	monthlyRevenue.forEach((revenue, i) => {
		let growthRate = !monthlyRevenue[i - 1] ? 100 : ((revenue - monthlyRevenue[i - 1]) / monthlyRevenue[i - 1]) * 100
		growthRates.push(growthRate)
		console.log("Count:", i + 1)
		console.log("No of transaction:", frequency[i])
		console.log("Growth Rate: " + Number.parseInt(growthRate) + "%")
		console.log("Revenue: N" + revenue)
		console.log("-----------------------")
	})

	let averageGrowthRate = growthRates.reduce((acc, rate) => acc + rate, 0) / growthRates.length
	console.log("Average Growth Rate: " + Math.floor(averageGrowthRate) + "%")

}

async function getTransactionsByMonth(){
	let allTransactions = await transactionModel.find({}).sort({ created_at: 1 }), 
			startMilli = Number(allTransactions[0].created_at),
			// daysInAMonth = (52 / 12) * 7,
			monthDifference = 86400000 * 28

	let monthlyTransactions = {}

	allTransactions.forEach(transaction => {
		let id = Math.floor((Number(transaction.created_at) - startMilli) / monthDifference)
		if(!monthlyTransactions[id])
			monthlyTransactions[id] = [transaction]
		else
			monthlyTransactions[id].push(transaction)
	})

	return monthlyTransactions
}

function getRevenue(transactions){
	let transactionKeys = Object.keys(transactions)

	let transactionFrequency = transactionKeys.map(key => {
		return transactions[key].reduce((total, currTransaction) => {
			return currTransaction.status == "success" ? total + 1 : total
		}, 0)
	})

	return [
		transactionKeys.map(key => {
			return transactions[key].reduce((total, currTransaction) => {
				// if(currTransaction.amount == 37000) console.log("Yes", key)
				return currTransaction.status == "success" ? total + currTransaction.amount : total
			}, 0)
		}),

		transactionFrequency
	]
}

connectToDb()
	.then(generateReport)