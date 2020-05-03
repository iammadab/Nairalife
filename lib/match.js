function findWords(string){
	return string.match(/(\w*)/g).filter(a => a)
}
