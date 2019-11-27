const { createValidator } = require("lazy-validator")

const addBalanceValidator = createValidator("user_id.number, amount.number")

const userDb = require("../../data/db/user.db")

async function addBalance(data){
	let validationResult = addBalanceValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let validData = validationResult.data

	let userObj = await userDb.findOneWith({ user_id: validData.user_id })
	if(!userObj)
		return { status: 403, code: "USER_NOT_FOUND" }

	// Each user has a nairalife balance and an available balance
	// The available balance is the amount of money the user can withdraw at any time
	// The nairalife balance is latent money that represents ownership
	// If the nairalife balance is negative, it means the user owes nairalife the absolute amount
	// If the nairalife balance is positive, it means nairalife owes them the absolute amount
	// If the nairalife balance is zero, it means no one owes any
	let { nairalife_balance, balance } = userObj
	let new_balance, new_nairalife_balance

	// Case 1: Nairalife balance is positive and amount is positive
	// This means we owe the user money, when we give them money, we reduce the amount we owe them
	// We subtract the amount we are giving them from their nairalife balance
	// And still give them the full balance
	if(nairalife_balance >= 0 && amount >= 0){
		new_balance = amount
		new_nairalife_balance = nairalife_balance - amount
	}

	// Case 2: Nairalife balance is negative and amount is positive
	// This means the user owes us money, hence we can't give them the complete cash
	// So we have to subtract how much they owe us from how much we are giving them
	// Since the amount is going to be negative we can just add
	if(nairalife_balance < 0 && amount >= 0){
		let netAmount = amount + nairalife_balance
		if(netAmount < 0){ // They still owe us money
			new_nairalife_balance = netAmount
			new_balance = 0
		}
		else if(netAmount >= 0){
			new_nairalife_balance = (-1 * netAmount)
			new_balance = netAmount
		}
	}


	// Case 3: Nairalife balance is negative and the amount we are adding is negative
	// In this case, the user is alreay owing us cash and we are decducting more cash
	// In this case, we subtract the amount from total balance which, effectively adds them up
	if(nairalife_balance < 0 && amount < 0){
		new_nairalife_balance = nairalife_balance + amount
		new_balance = 0
	}



	// Case 4: Nairalife balance is positive and the amount we are adding is negative
	// This means we owe the user some money, but now we are removing money from the user
	// This effectively means that we don't owe the user as much
	// So we subtract what we want to deduct, from the nairalife balance to get the new nairalife balance
	if(nairalife_balance >= 0 && amount < 0){
		new_nairalife_balance = nairalife_balance + amount
		new_balance = 0
	}

	// Now that we are done, we update the userobj
	// Note, we don't take money from what the user has in their available balance
	// We can only add more money to their available balance
	// Meaning that the new_balance must always be positive
	userObj = await userDb.appendDoc({ user_id: validData.user_id }, "nairalife_balance", new_nairalife_balance)
	userObj = await userDb.appendDoc({ user_id: validData.user_id }, "balance", (balance + new_balance))

	if(!userObj)
		return { status: 403, "PROBLEM_ADDING_BALANCE" }

	return { sttus: 200, code: "UPDATED_USER_BALANCE" }

}

module.exports = addBalance