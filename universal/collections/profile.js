/* here, we defined the profile of the user */
const user = Meteor.users;

const schema = new SimpleSchema ({
  name    : { type: String,   optional: true},
  gender  : { type: String,   optional: true},
  phone   : { type: String,   optional: true, regEx: /^\+?[0-9\. -]+$/ },
  birthday: { type: String,   optional: true, },
  career  : { type: String,   optional: true},
  hobby   : { type: [String], optional: true},
  photo   : { type: String,   optional: true},
  agree   : { type: Boolean,  optional: true}
});

user.attachSchema(
  new SimpleSchema({
    profile: { type: schema },
  })
);

export default user;
