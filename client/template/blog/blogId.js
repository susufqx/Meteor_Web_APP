Template.blogId.helpers({
  'blog' : ()=> Template.instance().blog.get()
});

Template.blogId.onCreated(function() {
  Meteor.subscribe('blogs');

  let id = Router.current().params._id;
  this.blog = new ReactiveVar();

  this.autorun(()=> {
    let blog = Meteor.blogs.findOne({_id:id});
    if(blog){
      blog.date = moment(blog.date).format('LL');
      this.blog.set(blog);
    }
  });
});
