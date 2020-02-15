function word(length){
	let wordString = ""
	for(let i = 0; i < length; i++){
		wordString += generateRandomCharacter()
	}
	return wordString
}

function generateRandomCharacter(){
	return String.fromCharCode(generateRandomCode(48, 122))
}

function generateRandomCode(start, end){
	let diff = end - start, randomNum = Math.floor(Math.random() * diff)
	return start + randomNum
}

// console.log(word(16))

module.exports = {
	word
}