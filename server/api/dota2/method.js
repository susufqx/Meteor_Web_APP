import {meteor} from 'meteor/meteor';

Meteor.methods({
  'getMatchDota2'(id){
    check(id, String);
    let key = Meteor.settings.private.dota2api.key;

    //const Dota2Api  =   require('dota2-api');
    //const da        =   Dota2Api.create(key,570);
    const Dota2Api  =   require('susu-dota2-api');
    const da        =   Dota2Api.create(key);
    const options   =   {
      match_id:id
    };
    return da.getMatchDetails(options);
  },

  'getAccountDota2'(id){
    check(id, String);
    //let steamids = parseInt(id) + 76561197960265728;
    let key = Meteor.settings.private.dota2api.key;

    const Dota2Api  =   require('susu-dota2-api');
    const da        =   Dota2Api.create(key);

    const options   = {
      steamids:id
    };
    return da.getPlayerSummaries(options);
  },

  'getMatchHistory'(id){
    check(id, String);
    let key = Meteor.settings.private.dota2api.key;

    const Dota2Api = require('susu-dota2-api');
    const da       = Dota2Api.create(key);

    const options  = {
      account_id:id
    };
    return da.getMatchHistory(options);
  }
});
