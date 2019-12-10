const pageFunctions = require("./functions")

async function stat(req, res, next){
	let allMembers = await pageFunctions.fetchUsers()
	let activeMembers = await pageFunctions.fetchUsers({ stage: "active", status: "payment_one" })
	let cars = await pageFunctions.fetchUsers({ status: "payment_two" })
	let allHpTransactions = await pageFunctions.fetchTransactions({ type: "higher_purchase" })

	let totalPaid = 0
	for(let i = 0; i < allHpTransactions.length; i++){
		totalPaid += allHpTransactions[i].amount
	}

	let toPay = 0
	for(let i = 0; i < activeMembers.length; i++){
		toPay += activeMembers[i]._doc.plan.total_amount || 0
	}

	req.body.pageData = {
		allMembersCount: allMembers.length,
		activeMembersCount: activeMembers.length,
		carsCount: cars.length,
		totalPaid,
		toPay
	}

	next()
}

module.exports = stat