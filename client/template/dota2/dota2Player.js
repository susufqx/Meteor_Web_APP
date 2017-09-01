Template.dotaTwoPlayer.onCreated(function() {
  this.playerInfo = new ReactiveVar();

  Tracker.autorun(()=> {
    let account_id = _.last((Router.current().url).split('/'));
    let playerInfo = this.playerInfo.get();

    if(!playerInfo) {
      Meteor.call('getAccountDota2',
        account_id,
        (err, res) => {
          if(!err && res) {
            console.log(res.response.players[0]);
            this.playerInfo.set(res.response.players[0]);
          }else if(err){
            console.log(err);
          }
        }
      );
    }
  });
});

Template.dotaTwoPlayer.helpers({
  'playerInfo' : () => Template.instance().playerInfo.get()
});
