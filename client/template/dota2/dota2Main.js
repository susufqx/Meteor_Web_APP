import {dota2_data}           from '/lib/dota2_data/dota2_method.js';
import {getMode, deleteNull}  from './dota2Match.js';
/*
Template.dotaTwoPlayerMain.onRendered(function() {
  console.log(Template.currentData());
  console.log();
  Tracker.autorun(() => {
    let playerInfo = Template.instance().playerInfo.get();
    if(playerInfo) {
      console.log(playerInfo.personaname);

    }
  });
});*/

Template.dotaTwoPlayerMain.events({
  'click .match-button' (evt, template){
    let id = evt.currentTarget.id;
    Router.go('dotaTwoMatch', {_id: id});
  }
});

Template.dotaTwoPlayerMain.helpers({
  'playerInfo'        : () => Template.instance().playerInfo.get(),
  'matchHistory'      : () => Template.instance().matchHistory.get(),
  'matchesInfo'       : () => {
    let num = Template.instance().matchesNumber.get();
    let matches = [];
    for (let i=0;i<num;i++) {
      let add = Template.instance().matchesInfo.get(i.toString());
      matches.push(add);
    }
    return matches;
  },
  'matchesRecentInfo' : () => {
    let matches = [];
    for (let i=0;i<10;i++) {
      let add = Template.instance().matchesInfo.get(i.toString());
      matches.push(add);
    }
    return matches;
  }
});

Template.dotaTwoPlayerMain.onCreated(function() {
  this.playerInfo     = new ReactiveVar();
  this.matchHistory   = new ReactiveVar();
  this.matchesNumber  = new ReactiveVar();
  this.matchesInfo    = new ReactiveDict();

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

    if(playerInfo) {
      let playerName = playerInfo.personaname;
      let pathName   = Router.current().route.getName();
      if (pathName === 'dotaTwoPlayerSummaries' || pathName === 'dotaTwoPlayerMatchHistory'){
        document.title  =  playerName + '-SusuFQX';
      }
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
            this.matchesNumber.set(res.result.num_results);
          } else if(err) {
            console.log(err);
          }
        }
      );
    }

    if(matchHistory) {
      for(let i in matchHistory) {
        Meteor.call('getMatchDota2',
          matchHistory[i].match_id.toString(), // in the function, id must be String type
          (err, res) => {
            if(!err && res) {
              let players = res.result.players;
              for(let n in players) {
                if(players[n].account_id.toString() === account_id) {
                  let getItems  = [
                    dota2_data.getItemImage(players[n].item_0),
                    dota2_data.getItemImage(players[n].item_1),
                    dota2_data.getItemImage(players[n].item_2),
                    dota2_data.getItemImage(players[n].item_3),
                    dota2_data.getItemImage(players[n].item_4),
                    dota2_data.getItemImage(players[n].item_5)
                  ];
                  let getPack   = [
                    dota2_data.getItemImage(players[n].backpack_0),
                    dota2_data.getItemImage(players[n].backpack_1),
                    dota2_data.getItemImage(players[n].backpack_2)
                  ];

                  matchHistory[i].kills       = players[n].kills;
                  matchHistory[i].deaths      = players[n].deaths;
                  matchHistory[i].assists     = players[n].assists;
                  matchHistory[i].KDA         = (Math.round((players[n].kills + players[n].assists) / players[n].deaths * 10) / 10).toFixed(1);
                  matchHistory[i].playerPart  = (players[n].player_slot < 4) ? true : false;
                  matchHistory[i].items       = {items:deleteNull(getItems), packs:deleteNull(getPack)};

                  break;
                }
              }

              matchHistory[i].result    = (matchHistory[i].playerPart === res.result.radiant_win) ? true : false;
              matchHistory[i].game_mode = getMode(res.result.game_mode);
              this.matchesInfo.set(i.toString(), matchHistory[i]);
            } else if(err) {
              console.log(err);
            }
          }
        );
      }
    }
  });
});
