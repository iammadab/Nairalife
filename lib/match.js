const leven = require("leven")

function findWords(string){
	return string.match(/(\w*)/g).filter(a => a)
}

function determineSimilarity(word1, word2){
	let firstWords = findWords(String(word1).toLowerCase()), secondWords = findWords(String(word2).toLowerCase())
	console.log(firstWords, secondWords)
	let mapA = createSearchMap(), mapB = createSearchMap()
	
	firstWords.forEach(word => {
		let probs = compareWith(secondWords, word)
		mapA.add(word, probs)
	})
	// console.log("Values of A:", mapA.values())
	// console.log(mapA.all())

	secondWords.forEach(word => {
		let probs = compareWith(firstWords, word)
		mapB.add(word, probs)
	})
	// console.log("Values of B:", mapB.values())
	// console.log(mapB.all())

	let pruneResult = prune(mapA, mapB)
	// console.log("Prune", pruneResult)
	return sum(pruneResult) / Math.max(firstWords.length, secondWords.length)
}



module.exports = determineSimilarity

function compareWith(array, word){
	return array.map(val => {
		let distance = leven(val, word)
		//// console.log("Distance", val, word, ":", distance)
		return 1 - (distance / Math.max(val.length, word.length))
	})
}


function createSearchMap(){
	let searchMap = {}, valueHeap = []

	return {
		add,
		all: () => searchMap,
		values: () => valueHeap,
		eliminate,
		eliminateKey,
		toEliminate,
		max: () => valueHeap[0]
	}

	function add(key, distribution){
		if(searchMap[key])
			console.warn("WARN: key overide", key)

		searchMap[key] = distribution

		valueHeap = valueHeap.concat(distribution)
		resetValues()
	}

	function eliminate(values){
		values.forEach(val => remove(valueHeap, val))
	}

	function toEliminate(n){
		let keys = Object.keys(searchMap), toEliminate = [], currKey =  ''
		for(let i = 0; i < keys.length; i++){
			let key = keys[i]
			if(searchMap[key].includes(n)){
				toEliminate = searchMap[key]
				currKey = key
				break
			}
		}
		return [currKey, toEliminate]
	}

	function eliminateKey(key){
		delete searchMap[key]
		// console.log(searchMap)
	}

	function remove(array, value){
		let index = array.indexOf(value)
		if(index > -1)
			array.splice(index, 1)
	}

	function resetValues(){
		valueHeap.sort().reverse()
	}
}

function prune(mapA, mapB){
	let max = mapA.max(), prob = []
	while(max != undefined){
		// console.log("")
		// console.log("Max before", max)
		prob.push(max)
		let [keyA, aEliminate] = mapA.toEliminate(max)
		let [keyB, bEliminate] = mapB.toEliminate(max)
		let toEliminate = merge(aEliminate, bEliminate)
		// console.log("To Eliminate", toEliminate)
		// console.log("Key A", keyA)
		// console.log("Key B", keyB)
		mapA.eliminate(toEliminate)
		mapA.eliminateKey(keyA)
		mapB.eliminate(toEliminate)
		mapB.eliminateKey(keyB)
		// console.log("A after elimination:", mapA.values())
		// console.log("B after elimination:", mapB.values())
		// console.log("Max after", mapA.max())
		max = mapA.max()
	}
	return prob
}

function merge(arrayA, arrayB){
	let mergedArray = [...arrayA]
	arrayB.forEach(val => {
		if(!mergedArray.includes(val))
			mergedArray.push(val)
	})
	return mergedArray
}

function sum(values){
	return values.reduce((acc, curr) => acc + curr)
}
