const paymentTrajectory = require("./paymentTrajectory")
const transactionDb = require("../../../data/db/transaction.db")

async function hasPendingPayment(user_id, loan_id, period, start, today){
	let { days, lastPayment } = paymentTrajectory(period, start, today)

	// If no day has passed since the start of the loan, the loan hasn't started
	// Hence there is no pending payment
	if(days < 0)
		return false 

	let transactionsAfterLastPayment = await transactionDb.findWith({ type: "loan", user_id, loan_id, status: "success", created_at: { $gt: lastPayment } })

	// If there is no transaction, the loan has a pending payment
	return transactionsAfterLastPayment.length == 0
}

module.exports = hasPendingPayment