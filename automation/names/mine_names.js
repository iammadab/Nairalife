const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, "../../", ".env") })

const { connectToDb } = require("../../runners/database_runner")
const userDb = require("../../data/db/user.db")

connectToDb()
	.then(grabNames)
	.then(createTable)
	.then(writeTable)

async function grabNames(){
	let allUsers = await userDb.findWith({}, { fullname: 1, bank: 1, card: 1 })
	let cleanUsers = allUsers.filter(user => {
		if(!user.fullname) return false
		if(!user.bank[0]) return false
		if(Object.keys(user.bank[0].bvn) < 1) return false
		return true
	})
	return cleanUsers
}


function createTable(users){
	let tableString = users.map(user => {
		let { bvn, account } = user.bank[0]
		return `"${user.fullname}","${account.account_name}","${bvn.first_name}","${bvn.last_name}" `
	})
	return tableString
}

async function writeTable(tableString){
	let completeData = [...tableString].join("\n")

	const { promisify } = require("util"), fs = require("fs"), writeFile = promisify(fs.writeFile)
	let fileStatus = await writeFile("names.csv", completeData)

	if(!fileStatus){
		console.log("Fetched names successfully")
		process.exit(0)
	}
	else
		console.log("Problem fetching names", fileStatus)
}


