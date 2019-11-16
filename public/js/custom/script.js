function showView(viewName){
	let viewToShow = document.querySelector(`#${viewName}`)
	if(!viewToShow) return
	let visibleViews = Array.from(document.querySelectorAll(".view.show"))
	visibleViews.forEach(view => view.classList.remove("show"))
	viewToShow.classList.add("show")
}