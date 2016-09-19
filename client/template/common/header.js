/* Template of header */
Template.header.helpers({
  'isHome': ()=> {
    let pathName = Router.current().route.getName();
    if(pathName === 'home') {
      return true;
    } else {
      return false;
    }
  }
});

Template.header.onRendered(function() {
  this.$('.main-menu')
  .visibility({
    once: false,
    onBottomPassed: function() {
      $('.following-menu').transition('fade in');
    },
    onBottomPassedReverse: function() {
      $('.following-menu').transition('fade out');
    }
  })
;
});

/* Template of menuUser */
Template.menuUser.onRendered(function() {
  this.$('.dropdown')
    .dropdown({
      transition: 'drop',
      action: 'hide'
    });
});

Template.menuUser.events({
  'click .logout'(){
    Meteor.logout();
    Router.go('/');
  }
});
