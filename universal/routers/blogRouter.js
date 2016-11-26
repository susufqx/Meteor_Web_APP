import blogs from '../collections/blog.js';
/* ROUTER OF BLOG */
Router.route('/blog', {
  name:'blog',
});

Router.route('/blog/:_id', {
   name: 'blogId',
   /*data: function () {
      return blogs.findOne({_id: this.params._id});
   }*/
});
/*
Router.route('/submit',{
  name: 'postSubmit'
});*/
