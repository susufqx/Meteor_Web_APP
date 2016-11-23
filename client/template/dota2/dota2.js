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
    case 1: mode = "All Pick";        break;
    case 2: mode = "Captain's Mode";  break;
  }
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
      Meteor.call('getAccountDota2',
        dota_id,
        (err, res)=> {
          if(!err && res){
            console.log(res);
            template.getAccountInfo.set(res);
          }
        }
      );
    }else if(kind_id === 1){
      Meteor.call('getMatchDota2',
        dota_id,
        (err, res)=> {
          if(!err && res.result.players){
            console.log(res);
            let matchInfo = res.result;
            matchInfo.start_time          = moment(new Date(res.result.start_time)).format('LL');
            matchInfo.duration            = getDuration(res.result.duration);
            matchInfo.first_blood_time    = getDuration(res.result.firts_blood_time);
            matchInfo.game_mode           = getMode(res.result.game_mode);
            template.getMatchInfo.set(matchInfo);
          }
        }
      );
    }
  }
});

Template.dotaTwo.helpers({
  'accountInfo' : () => Template.instance().getAccountInfo.get(),
  'matchInfo'   : () => Template.instance().getMatchInfo.get(),
  'players'     : () => {
    let matchInfo = Template.instance().getMatchInfo.get();
    let players;
    if(matchInfo){
      players = matchInfo.players;
      _.each(players, function(player){
        let kill     = player.kills;
        let assist   = player.assists;
        let death    = (player.deaths === 0)?1:player.deaths;
        player.KDA = (kill+assist)/death;
      });
    }
    return players;
  }
});

Template.dotaTwo.onCreated(function() {
  this.getAccountInfo = new ReactiveVar();
  this.getMatchInfo   = new ReactiveVar();
});

Template.dotaTwo.onRendered(function() {
  this.$('.js-dota2-type-dropdown').dropdown();
});
