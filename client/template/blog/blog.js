Template.blog.onCreated(function(){
  Meteor.subscribe('blogs');
  this.blogs = new ReactiveVar();
  /*this.label = new ReactiveDict();

  this.label.set();*/

  this.autorun(()=> {
    let blogs = Meteor.blogs.find().fetch();
    if(blogs !== []){
      _.each(blogs, function(blog){
        blog.date = moment(blog.date).format('LL');
      });
      this.blogs.set(blogs);
    }
  });
});

Template.blog.helpers({
  'blogs' : () => Template.instance().blogs.get()
});
