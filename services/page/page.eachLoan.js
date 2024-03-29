const pageFunctions = require("./functions")
const loanDb = require("../../data/db/loan.db")
const getBank = require("../payment/payment.getBank")
const userDb = require("../../data/db/user.db")

async function eachLoan(req, res, next){
	let loanObj = await loanDb.findOneWith({ _id: req.params.loan_id }), userObj
	if(req.url.includes("admin"))
		userObj = await userDb.findOneWith({ user_id: loanObj.user_id })
	else
		userObj = await pageFunctions.fetchUser(req.body.user.id)

	let bankName = ""

	if(userObj.user_id != loanObj.user_id)
		return res.redirect("/requests")

	let bankInfo = await getBank({ bank_code: userObj.bank[0].account.bank_code })
	if(bankInfo.status == 200)
		bankName = bankInfo.bank.name


	loanObj._doc.created_at = pageFunctions.createDate(loanObj.created_at).getHypenDate()
	loanObj._doc.beforeText = loanObj.weeks_before_payment > 1 ? `${loanObj.weeks_before_payment} weeks` : `${loanObj.weeks_before_payment} week`

	req.body.pageData = {
		loan: loanObj,
		user: userObj,
		account: userObj.bank[0].account,
		bankName
	}

	next()
}

module.exports = eachLoan