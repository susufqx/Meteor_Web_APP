import {meteor} from 'meteor/meteor';

Meteor.methods({
  'newUser'(user){
    check(user, {
      email     : String,
      password  : String
    });
    let id = Accounts.createUser(user);
    if(id) {
      return true;
    }else{
      return false;
    }
  }
});
