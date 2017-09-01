import {dota2_data} from '/lib/dota2_data/dota2_method.js';

function getDuration(secondTime){
  let second      = secondTime % 60;
  let minuteTime  = (secondTime-second)/60;
  let minute      = minuteTime % 60;
  let hour        = minuteTime>=60? ((minuteTime - minute) % 60):0;
  return hour+"h"+minute+"m"+second+"s";
}

function getMode(number){
  let mode;
  switch (number) {
    case 22 : mode = "All Pick";        break;
    case 2  : mode = "Captain's Mode";  break;
    case 3  : mode = "Random Mode";     break;
    default : mode = "UNKNOWN";
  }
  return mode;
}

function deleteNull(array) {
  let newArray = [];
  for (let i in array) {
    if(array[i]){
      newArray.push(array[i]);
    }
  }
  return newArray;
}
/*
Template.dotaTwoMatch.events({
  'submit .submit-id'(evt, template){
    evt.preventDefault();
    let dota_id = evt.target.dota2_id.value;
    let path_kind;
    let type = $('.dota2-type').text();

    switch (type) {
      case 'By Account ID'  : Router.go('dotaTwoPlayer',  {_id: dota_id});    break;
      case 'By Match ID'    : Router.go('dotaTwoMatch',   {_id: dota_id});    break;
      default : alert('Choose type and enter the dota2 id please!');
    }
  }
});*/

Template.dotaTwoMatch.helpers({
  'accountInfo' : () => Template.instance().getAccountInfo.get(),
  'matchInfo'   : () => Template.instance().getMatchInfo.get(),
  'toSearch'    : () => Template.instance().getMatchInfo,
  'radiant_win' : () => {
    let matchInfo = Template.instance().getMatchInfo.get();
    return matchInfo.radiant_win;
  },
  'players'     : () => {
    let matchInfo  = Template.instance().getMatchInfo.get();
    let players;
    let newPlayers = {};
    let len;
    let playerInfo = [];
    let front_img  = 'http://cdn.dota2.com/steamcommunity/public/images/avatars/';
    let noInfo_add = {personaname:'UNKNOWN PLAYER', avatar:'/images/items/unknown_player.jpg'};
    if(matchInfo){
      //console.log(matchInfo);
      newPlayers  =   {radiant:[], dire:[]};
      players     =   matchInfo.players;
      len         =   players.length;
      _.each(players, function(player, key){
        let kill     = player.kills;
        let assist   = player.assists;
        let death    = (player.deaths === 0)?1:player.deaths;
        let getItems = [
          dota2_data.getItemImage(player.item_0),
          dota2_data.getItemImage(player.item_1),
          dota2_data.getItemImage(player.item_2),
          dota2_data.getItemImage(player.item_3),
          dota2_data.getItemImage(player.item_4),
          dota2_data.getItemImage(player.item_5)
        ];
        let getPack = [
          dota2_data.getItemImage(player.backpack_0),
          dota2_data.getItemImage(player.backpack_1),
          dota2_data.getItemImage(player.backpack_2)
        ];

        player.KDA        =   (Math.round((kill+assist)/death * 10) / 10).toFixed(1);
        player.heroName   =   dota2_data.getHeroName(player.hero_id);
        player.heroImage  =   dota2_data.getHeroImage(player.hero_id);
        player.itemsImage =   {items:deleteNull(getItems), pack:deleteNull(getPack)};

        if(key < (len/2)){
          newPlayers.radiant.push(player);
        }else{
          newPlayers.dire.push(player);
        }
      });
      for(let i=0;i<5;i++) {
        let add       =   Template.instance().playerInfo.get(i.toString()) || {};
        newPlayers.radiant[i].playerInfo = (!add.personaname)?noInfo_add:add;
      }
      for(let i=0;i<5;i++) {
        let add = Template.instance().playerInfo.get((i+5).toString()) || {};
        newPlayers.dire[i].playerInfo = (!add.personaname)?noInfo_add:add;
      }
    }
    console.log(newPlayers);
    return newPlayers;
  }
});

Template.dotaTwoMatch.onCreated(function() {
  this.getAccountInfo   =   new ReactiveVar();
  this.getMatchInfo     =   new ReactiveVar();
  (this.playerInfo      =   new ReactiveDict()).setDefault({
    '0':{},'1':{},'2':{},'3':{},'4':{},
    '5':{},'6':{},'7':{},'8':{},'9':{}
  });

  Tracker.autorun(()=> {
    let matchInfo = this.getMatchInfo.get();
    let match_id  = _.last((Router.current().url).split('/'));

    if(!matchInfo) {
      Meteor.call('getMatchDota2',
        match_id,
        (err, res)=> {
          if(!err && res.result.players){
            let matchInfo = res.result;
            let players   = res.players;

            matchInfo.start_time          = moment(new Date(res.result.start_time * 1000)).format('LL');
            matchInfo.duration            = getDuration(res.result.duration);
            matchInfo.first_blood_time    = getDuration(res.result.first_blood_time);
            matchInfo.game_mode           = getMode(res.result.game_mode);

            this.getMatchInfo.set(matchInfo);
            this.getAccountInfo.set(null);
          }
        }
      );
    }

    if(matchInfo){
      let players = matchInfo.players;

      for(let i in players) {
        Meteor.call('getAccountDota2',
          players[i].account_id.toString(),
          (err, res)=>{
            if(!err && res){
              let add   = res.response.players[0];
              add.key   = i;
              this.playerInfo.set(i.toString(), add);
            }else{
              console.log(err);
            }
          }
        );
      }
    }
  });
});

Template.dotaTwoMatch.onRendered(function() {
  this.$('.js-dota2-type-dropdown').dropdown();
});
