
Template.postItem.helpers({
	domain:()=> {
		var a = document.createElement('a');
		a.href = this.url;
		return a.hostname;
	}
});
