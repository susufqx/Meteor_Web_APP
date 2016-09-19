import {meteor} from 'meteor/meteor';

Meteor.methods({
  'profile.update'(username, profile){
    check(username, String);
    check(profile, Object);

    Meteor.users.update(Meteor.userId(),
      {"$set": {'username':username, 'profile': profile}},
      function(err, num){
        if(err){
          console.error(err);
        }else{
          console.log(num);
        }
      }
    );
  }
});
