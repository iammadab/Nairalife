let store = {
	commentFormTag: ".comment-form",
	addCommentButton: document.querySelector(".add-comment-button"),
	commentBox: document.querySelector(".comment-box")
}

;(function attachEvents(){
	addEvent([store.addCommentButton], "click", addComment)
	addEvent([store.commentBox], "input,focus", () => hideAlert("comment-error"))
})()

let commentButton = createButton(".comment-text", "Add Comment", "Adding comment...")
function addComment(event){
	event.preventDefault()
	commentButton()
	let { group_id } = event.target.dataset
	let commentData = store.commentBox.value
	if(!commentData){
		commentButton("normal")
		return showAlert("comment-error", "Comment empty")
	}

	return api("group/comment", { token: getToken(), group_id, comment: commentData })
			.then(handleResponse)

	function handleResponse(response){
		// console.log(response)
		if(response.status == 200)
			redirect(window.location.href)
		commentButton("normal")
	}
}