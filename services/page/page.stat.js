const pageFunctions = require("./functions")
const userDb = require("../../data/db/user.db")
const loanDb = require("../../data/db/loan.db")
async function stat(req, res, next){
	let allMembers = await pageFunctions.fetchUsers()
	let verifiedMembers = await userDb.findWith({ stage: "active" })
	let activeMembers = await pageFunctions.fetchUsers({ stage: "active", status: { $in: ["payment_one", "payment_two"] }})
	let cars = await pageFunctions.fetchUsers({ status: "payment_two" })
	let allHpTransactions = await pageFunctions.fetchTransactions({ type: "higher_purchase", status: "success" })

	let totalPaid = 0
	for(let i = 0; i < allHpTransactions.length; i++){
		totalPaid += allHpTransactions[i].amount
	}

	let toPay = 0
	for(let i = 0; i < activeMembers.length; i++){
		toPay += activeMembers[i]._doc.plan.total_amount || 0
	}

	let weeklyHigherPurchase = 0
	for(let i = 0; i < activeMembers.length; i++){
		let member = activeMembers[i]
		if(member.status == "payment_one")
			weeklyHigherPurchase += (member.payment_one.amount * 7)
		else if(member.status == "payment_two")
			weeklyHigherPurchase += member.plan.amount
	}

	let allLoans = await loanDb.findWith({})
	let pendingLoans = await loanDb.findWith({ status: "pending" })
	let activeLoans = await loanDb.findWith({ status: "approved" })

	let totalActiveLoanAmount = activeLoans.reduce((acc, curr) => acc + curr.initial_amount, 0)
	let totalActiveInterest = activeLoans.reduce((acc, curr) => acc + (curr.final_amount - curr.initial_amount), 0)
	let totalWeeklyLoanPayment = 0
	for(let i = 0; i < activeLoans.length; i++){
		let loan = activeLoans[i], weekly = loan.final_amount / loan.weeks
		totalWeeklyLoanPayment += weekly
	}

	let totalPendingLoanAmount = pendingLoans.reduce((acc, curr) => acc + curr.initial_amount, 0)

	req.body.pageData = {
		allMembersCount: allMembers.length,
		verifiedMembersCount: verifiedMembers.length,
		activeMembersCount: activeMembers.length,
		carsCount: cars.length,
		totalPaid,
		toPay,
		weeklyHigherPurchase,

		allLoansCount: allLoans.length,
		pendingLoansCount: pendingLoans.length,
		pendingLoansAmount: totalPendingLoanAmount,
		activeLoansCount: activeLoans.length,
		activeLoansAmount: totalActiveLoanAmount,
		activeInterest: totalActiveInterest,
		weeklyLoan: totalWeeklyLoanPayment
	}

	next()
}

module.exports = stat