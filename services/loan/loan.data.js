const FOUR_AND_LESS = 10
const EIGHT_AND_LESS = 25
const TWELEVE_AND_LESS = 35
const SIXTEEN_AND_LESS = 50

function generateInterest(weeks){
	if(weeks <= 4) return FOUR_AND_LESS
	if(weeks <= 8) return EIGHT_AND_LESS
	if(weeks <= 12) return TWELEVE_AND_LESS
	if(weeks <= 16) return SIXTEEN_AND_LESS
}


module.exports = generateInterest