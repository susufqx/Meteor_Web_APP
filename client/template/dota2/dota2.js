Template.dotaTwo.events({
  'click .js-test-dota2-button'(){
    Meteor.call('getInfoDota2');
  }
});
