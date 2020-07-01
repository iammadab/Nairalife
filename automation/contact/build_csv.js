const { promisify } = require("util")
const fs = require("fs")

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

let startLine = "Name,Given Name,Additional Name,Family Name,Yomi Name,Given Name Yomi,Additional Name Yomi,Family Name Yomi,Name Prefix,Name Suffix,Initials,Nickname,Short Name,Maiden Name,Birthday,Gender,Location,Billing Information,Directory Server,Mileage,Occupation,Hobby,Sensitivity,Priority,Subject,Notes,Language,Photo,Group Membership,E-mail 1 - Type,E-mail 1 - Value,Phone 1 - Type,Phone 1 - Value,Phone 2 - Type,Phone 2 - Value\n"

readFile("./contacts-o.txt", "utf-8")
	.then(eachContact)
	.then(buildLines)
	.then(writeOutput)
	.then(() => console.log("Completed"))
	.catch(console.log)

function eachContact(allContacts){
	let contacts = Array.from(new Set(allContacts.split(",")))
	console.log(contacts.length)
	return contacts
}

function buildLines(contacts){
	return contacts.map((contact, i) => {
		return buildLine(`Driver ${i}`, contact)
	}).join("\n")
}

function writeOutput(output){
	console.log(output)
	return writeFile("contacts2.csv", startLine + output)
}


function buildLine(name, phone){
	return `${name},${name},,,,,,,,,,,,,,,,,,,,,,,,,,,* myContacts,,,Mobile,${phone},,`
}

