/* MAIN ROUTER */
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    /*waitOn: function () {
        return Meteor.subscribe('posts');
    }*/
});

Router.route('/',{
    name: 'home'
});

var requireLogin = function() {
  if(!Meteor.user()) {
    if(Meteor.loggingIn){
      this.render(this.loadingTemplate);
    }else{
      this.render('accessDenied');
    }
  }else{
    this.next();
  }
};
