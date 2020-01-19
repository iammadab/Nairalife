const { createValidator } = require("lazy-validator")

const guarantorValidator = createValidator("fullname.string, phone.number, house_address.string, type_of_employer.string, place_of_work.string, description_of_work.string, relationship.string")

const userDb = require("../../data/db/user.db")

async function addGuarantor(data){
	const validationResult = guarantorValidator.parse(data)
	if(validationResult.error)
		return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.errors }

	let validData = validationResult.data

	let userObj = await userDb.findOneWith({ _id: data.user.id })
	if(!userObj)
		return { status: 403, code: "USER_DOES_NOT_EXIST" }

	userObj = await userDb.appendDoc({ _id: data.user.id }, "guarantor", validData)
	if(!userObj)
		return { status: 500, code: "PROBLEM_ADDING_GUARANTOR" }

	userObj = await userDb.appendDoc({ _id: data.user.id }, "stage", "add_proof")
	if(!userObj)
		return { status: 500, code: "PROBLEM_UPDATING_STAGE" }

	return { status: 200, code: "ADDED_GUARANTOR" }
}

module.exports = addGuarantor