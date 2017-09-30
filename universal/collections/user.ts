const user = Meteor.users;

(<any>user).attachSchema(
    new SimpleSchema({
      username: {
          type: String,
          // For accounts-password, either emails or username is required, but not both. It is OK to make this
          // optional here because the accounts-password package does its own validation.
          // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
          optional: true
      },
      emails: {
          type: Array,
          // For accounts-password, either emails or username is required, but not both. It is OK to make this
          // optional here because the accounts-password package does its own validation.
          // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
          optional: true
      },
      "emails.$": {
          type: Object
      },
      "emails.$.address": {
          type: String,
          regEx: SimpleSchema.RegEx.Email
      },
      "emails.$.verified": {
          type: Boolean
      },
      createdAt: {
          type: Date
      },
      // Make sure this services field is in your schema if you're using any of the accounts packages
      services: {
          type: Object,
          optional: true,
          blackbox: true
      },
    })
);

function getImage()
{
  return (this.profile.photo? this.profile.photo:"/images/index/defaultPhoto.jpg");
}

(<any>user).helpers({
  'getImage':   getImage,
});

if (Meteor.isServer) {
  user.allow({
    insert : () => false,
    update : () => false,
    remove : () => false
  });
}

export default user;
