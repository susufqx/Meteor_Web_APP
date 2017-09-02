import {dota2_data} from '/lib/dota2_data/dota2_method.js';

Template.dotaTwoPlayer.onCreated(function() {
  this.playerInfo   = new ReactiveVar();
  this.matchHistory = new ReactiveVar();

  Tracker.autorun(()=> {
    let account_id    =   _.last((Router.current().url).split('/'));
    let playerInfo    =   this.playerInfo.get();
    let matchHistory  =   this.matchHistory.get();

    if(!playerInfo) {
      Meteor.call('getAccountDota2',
        account_id,
        (err, res) => {
          if(!err && res) {
            this.playerInfo.set(res.response.players[0]);
          }else if(err){
            console.log(err);
          }
        }
      );
    }

    if(!matchHistory) {
      Meteor.call('getMatchHistory',
        account_id,
        (err, res) => {
          if(!err && res) {
            let historyInfo = res.result.matches;
            for(let n in historyInfo) {
              let players = historyInfo[n].players;
              historyInfo[n].start_time = moment(new Date(historyInfo[n].start_time * 1000)).fromNow();
              for (let i in players) {
                if(account_id === players[i].account_id.toString()){
                  historyInfo[n].hero_id = players[i].hero_id;
                  break;
                }
              }
              historyInfo[n].hero_image = dota2_data.getHeroSmallImage(historyInfo[n].hero_id);
              historyInfo[n].hero_name  = ((dota2_data.getHeroName(historyInfo[n].hero_id)).split('_')).join(' ');
            }
            this.matchHistory.set(historyInfo);
          } else if(err) {
            console.log(err);
          }
        }
      );
    }
  });
});

Template.dotaTwoPlayer.helpers({
  'playerInfo'     : () => Template.instance().playerInfo.get(),
  'matchHistory'   : () => Template.instance().matchHistory.get()
});

Template.dotaTwoPlayer.events({
  'click .match-button' (evt, template){
    let id = evt.currentTarget.id;
    console.log(id);
    Router.go('dotaTwoMatch', {_id: id});
  }
});
