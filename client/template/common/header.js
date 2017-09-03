/* Template of header */
Template.header.helpers({
  'isHome': ()=> {
    let pathName = Router.current().route.getName();
    if(pathName === 'home') {
      return true;
    } else {
      return false;
    }
  },

  'isDota': ()=> {
    let pathName = Router.current().route.getName();
    return ((pathName) === 'dotaTwo' ||
            (pathName) === 'dotaTwoMatch' ||
            (pathName) === 'dotaTwoPlayer' ||
            (pathName) === 'dotaTwoPlayerSummaries' ||
            (pathName) === 'dotaTwoPlayerMatchHistory')? true : false;
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
      on:'hover',
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
