const pageFunctions = require("./functions")
const loanDb = require("../../data/db/loan.db")

async function eachLoan(req, res, next){
	let loanObj = await loanDb.findOneWith({ _id: req.params.loan_id })
	let userObj = await pageFunctions.fetchUser(req.body.user.id)

	if(userObj.user_id != loanObj.user_id)
		return res.redirect("/requests")

	loanObj._doc.created_at = pageFunctions.createDate(loanObj.created_at).getHypenDate()
	loanObj._doc.weekly_payment = loanObj.final_amount / loanObj.weeks
	loanObj._doc.beforeText = loanObj.weeks_before_payment > 1 ? `${loanObj.weeks_before_payment} weeks` : `${loanObj.weeks_before_payment} week`

	req.body.pageData = {
		loan: loanObj,
		account: userObj.bank[0].account
	}

	next()
}

module.exports = eachLoan