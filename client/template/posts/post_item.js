Template.postItem.helpers({
  domain: function() {
    let a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
});
