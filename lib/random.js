function word(length){
	let wordString = ""
	for(let i = 0; i < length; i++){
		wordString += generateRandomCharacter()
	}
	return wordString
}

function generateRandomCharacter(){
	let lowercaseGenerator = createCodeGenerator(97, 123),
			uppercaseGenerator = createCodeGenerator(65, 91),
			numberGenerator = createCodeGenerator(48, 58)

	let generator = createProbabilityGenerator([
		{ fn: lowercaseGenerator, prob: 70 },
		{ fn: uppercaseGenerator, prob: 20 },
		{ fn: numberGenerator, prob: 10 }
	])

	return String.fromCharCode(generator())
}

function createCodeGenerator(start, end){
	return function generate(){
		let diff = end - start, randomNum = Math.floor(Math.random() * diff)
		return start + randomNum
	}
}

function createProbabilityGenerator(generators){
	let sum = 0, stackedGenerator = generators.map(generator => {
		generator.limit = sum = sum + (generator.prob / 100)
		return generator
	})

	return function generate(){
		let position = Math.random()
		for(let i = 0; i < stackedGenerator.length; i++){
			if(position <= stackedGenerator[i].limit)
				return stackedGenerator[i].fn()
		}
	}
}

module.exports = {
	word
}