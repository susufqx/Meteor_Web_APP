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

Template.dotaTwo.events({
  'submit .submit-id'(evt, template){
    evt.preventDefault();
    let type;
    let kind_id;
    let dota_id;
    let target = evt.target;

    type = $('.dota2-type').text();
    dota_id = target.dota2_id.value;
    switch (type) {
      case 'By Account ID'  :kind_id=0;  break;
      case 'By Match ID'    :kind_id=1;    break;
      default: kind_id = -1;
    }
    if((kind_id < 0) || (!dota_id)) {
      alert('Choose type and enter the dota2 id please!');
    }else if(kind_id === 0){
      template.getAccountInfo.set(null);
      Meteor.call('getAccountDota2',
        dota_id,
        (err, res)=> {
          if(!err && res){
            template.getAccountInfo.set(res);
            template.getMatchInfo.set(null);
          }
        }
      );
    }else if(kind_id === 1){
      Meteor.call('getMatchDota2',
        dota_id,
        (err, res)=> {
          if(!err && res.result.players){
            let matchInfo = res.result;
            let players   = res.players;

            matchInfo.start_time          = moment(new Date(res.result.start_time * 1000)).format('LL');
            matchInfo.duration            = getDuration(res.result.duration);
            matchInfo.first_blood_time    = getDuration(res.result.first_blood_time);
            matchInfo.game_mode           = getMode(res.result.game_mode);

            template.getMatchInfo.set(matchInfo);
            template.getAccountInfo.set(null);
          }
        }
      );
    }
  }
});

Template.dotaTwo.helpers({
  'accountInfo' : () => Template.instance().getAccountInfo.get(),
  'matchInfo'   : () => Template.instance().getMatchInfo.get(),
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
      console.log(matchInfo);
      newPlayers  =   {radiant:[], dire:[]};
      players     =   matchInfo.players;
      len         =   players.length;
      _.each(players, function(player, key){
        let kill     = player.kills;
        let assist   = player.assists;
        let death    = (player.deaths === 0)?1:player.deaths;
        player.KDA = Math.round((kill+assist)/death * 10) / 10;
        player.key = key;
        if(key < (len/2)){
          newPlayers.radiant.push(player);
        }else{
          newPlayers.dire.push(player);
        }
      });
      for(let i=0;i<5;i++) {
        let add = Template.instance().playerInfo.get(i.toString()) || {};
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

Template.dotaTwo.onCreated(function() {
  this.getAccountInfo   =   new ReactiveVar();
  this.getMatchInfo     =   new ReactiveVar();
  (this.playerInfo      =   new ReactiveDict()).setDefault({
    '0':{},'1':{},'2':{},'3':{},'4':{},
    '5':{},'6':{},'7':{},'8':{},'9':{}
  });

  Tracker.autorun(()=> {
    let matchInfo = this.getMatchInfo.get();
    if(matchInfo){
      let players = matchInfo.players;
      for(let i=0;i<10;i++) {
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

Template.dotaTwo.onRendered(function() {
  this.$('.js-dota2-type-dropdown').dropdown();
});
