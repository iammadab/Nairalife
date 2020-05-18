const userDb = require("../../data/db/user.db")
const transactionDb = require("../../data/db/transaction.db")
const getTrajectory = require("../loan/functions/paymentTrajectory")

async function chargeHp(req, res, next){
	// This service is resposible for showing all the hp members
	// and determing if they should be charged or not

	// This grabs all the members on hp
	let hpMembers = await userDb.findWith({ stage: "active", status: { $in: ["payment_one", "payment_two"] } })
	let size = hpMembers.length

	for(let i = 0; i < size; i++){
		let member = hpMembers[i]

		// We determine the current plan of the hp member
		let plan = member.status == "payment_one" ? member.payment_one : member.plan
		let { days, lastPayment } = getTrajectory(plan.period, plan.start_date)
		
		// If payment hasn't started, the member should not be charges
		if(days < 0)
			member._doc.chargeToday = false

		else {
			// Get all the transactions since last scheduled payment
			let transactionsAfterLastPayment = await transactionDb.findWith({
				type: "higher_purchase",
				user_id: member.user_id,
				status: "success",
				created_at: { $gt: lastPayment }
			})

			// If there are no transactions, member still has pending payment
			// Else member doesn't need to pay
			member._doc.chargeToday = transactionsAfterLastPayment.length == 0
		}

		member._doc.totalPayment = await getTotalTransactions(member.user_id)
		member._doc.remainingPayment = member.plan.total_amount - member._doc.totalPayment
		member._doc.weeklyPayment = plan.amount
	}

	req.body.pageData = {
		higherPurchaseMembers: hpMembers
	}

	next()

}

module.exports = chargeHp

async function getTotalTransactions(user_id){
	let allLoanTransactions = await transactionDb.findWith({ user_id, type: "higher_purchase", status: "success" })
	return allLoanTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)
}