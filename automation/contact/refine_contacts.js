const { promisify } = require("util")
const fs = require("fs")

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

readFile("./contacts.txt", "utf-8")
	.then(eachContact)
	.then(removeSpaces)
	.then(writeOutput)
	.then(() => { console.log("Completed") })
	.catch(console.log)

function eachContact(contacts){
	return contacts.split(",")
}

function removeSpaces(contacts){
	return contacts.map(contact => contact.replace(/\s/g, "")).join(",")
}

function writeOutput(output){
	return writeFile("contacts-o.txt", output)
}