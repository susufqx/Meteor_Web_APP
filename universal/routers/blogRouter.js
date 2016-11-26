/* ROUTER OF BLOG */
Router.route('/blog', {
  name:'blog',
});

Router.route('/blog/:_id', {
   name: 'blogId',
   data: function() {
       return blogs.findOne(this.params._id);
   }
});
/*
Router.route('/submit',{
  name: 'postSubmit'
});*/
