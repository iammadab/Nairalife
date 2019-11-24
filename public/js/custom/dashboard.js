let store = {
	commentFormTag: ".comment-form",
	addCommentButton: document.querySelector(".add-comment-button")
}

;(function attachEvents(){
	addEvent([store.addCommentButton], "click", addComment)
})()

function addComment(event){
	event.preventDefault()
	console.log("Adding comment")
}