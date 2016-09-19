// TODO: call this in entry file
export default function () {
  Meteor.publish('user', function () {
    return user.find();
  });
}
