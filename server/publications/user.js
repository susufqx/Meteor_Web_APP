
export default function () {
  Meteor.publish('user', function () {
    return user.find();
  });
}
