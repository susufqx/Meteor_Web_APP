Template.postSubmit.events({
  'submit form': function(event) {
    event.preventDefault();

    var post = {
      url: $(event.target).find('[name=url]').val(),
      title: $(event.target).find('[name=title]').val()
    };

    Meteor.call('postInsert', post, (err, res)=> {
      if(err) {
        console.log(err.reason);
      }
      if(res.postExists) {
        alert('该链接已经存在');
      }
      Router.go('postPage', {_id: res._id});
    });
  }
});
