Template.blog.onCreated(function(){
  Meteor.subscribe('blogs');
  this.blogs = new ReactiveVar();
  this.write = new ReactiveVar(false);
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
  'blogs' : () => Template.instance().blogs.get(),
  'write' : () => Template.instance().write.get()
});

Template.blog.events({
  'click .js-write-blog'(evt, template){
    template.write.set(true);
    console.log(template.write.get());
  },

  'click .js-end-blog'(evt, template){
    template.wirte.set(false);
  },

  'submit .js-confirm-blog'(evt, template){
    /* insert the blog into the MONGODB, edit code later... */
  }
});
