Template.blog.onCreated(function(){
  Meteor.subscribe('blogs');
  this.blogs = new ReactiveVar();
  this.write = new ReactiveVar(false);
  /*this.label = new ReactiveDict();

  this.label.set();*/

  this.autorun(()=> {
    let blogs = Meteor.blogs.find().fetch();
    blogs     = blogs.reverse();
    if(blogs !== []){
      _.each(blogs, function(blog){
        blog.date = moment(blog.date).format('LL');
      });
      this.blogs.set(blogs);
    }
  });
});

Template.blog.helpers({
  'blogs' : () => Template.instance().blogs.get(),
  'write' : () => Template.instance().write.get()
});

Template.blog.events({
  'click .js-write-blog'(evt, template){
    template.write.set(true);
    console.log(template.write.get());
  },

  'click .js-end-blog'(evt, template){
    template.write.set(false);
  },

  'submit .reply'(evt, template){
    /* insert the blog into the MONGODB, edit code later... */
    evt.preventDefault();
    let userId  = Meteor.userId();
    let target  = evt.target;
    let blogs   = {};

    blogs.userID = userId;
    blogs.title  = target.title.value;
    blogs.date   = new Date();
    blogs.text   = target.text.value;
    blogs.labels = [];
    console.log(blogs);
    Meteor.blogs.insert(blogs);
    template.write.set(false);
  }
});
