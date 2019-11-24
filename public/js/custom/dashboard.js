let store = {
	commentFormTag: ".comment-form",
	addCommentButton: document.querySelector(".add-comment-button")
}

;(function attachEvents(){
	addEvent([store.addCommentButton], "click", addComment)
})()

function addComment(event){
	event.preventDefault()
	let { group_id } = event.target.dataset
	let commentData = document.querySelector(".comment-box").value
	if(!commentData)
		return console.log("You didn't add a comment")

	return api("group/comment", { token: getToken(), group_id, comment: commentData })
			.then(handleResponse)

	function handleResponse(response){
		// console.log(response)
		if(response.status == 200)
			redirect(window.location.href)
	}
}