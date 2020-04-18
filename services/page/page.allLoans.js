const pageFunctions = require("./functions")
const loanDb = require("../../data/db/loan.db")

async function allLoans(req, res, next){
	let allLoans = await loanDb.findWith({})

	allLoans.forEach(loan => {
		loan._doc.created_at = pageFunctions.createDate(loan._id.getTimeStamp()).getHypenDate()
	})

	req.body.pageData = {
		loans: allLoans
	}

	next()
}

module.exports = allLoans