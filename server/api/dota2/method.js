import {meteor} from 'meteor/meteor';

Meteor.methods({
  'getInfoDota2'(){
    let key = Meteor.settings.private.dota2api.key;
    //let key = "F3B2BA2DF342DA3C24A13D6D943C6BF9";
    console.log(key);
    const Dota2Api = require('dota2-api', 570);
    const da = Dota2Api.create(key);
    const options = {game_mode: 1};

    da.getMatchHistory(options).then((result) => {
     //console.log(result);
     console.log(result.result.matches[0]);
     console.log(result.result.matches[1]);
     console.log(result.result.matches[2]);
     console.log(result.result.matches[3]);
     console.log(result.result.matches[4]);
    }, (errorResponseStatusText) => {
     console.log(errorResponseStatusText);
    });
  }
});
