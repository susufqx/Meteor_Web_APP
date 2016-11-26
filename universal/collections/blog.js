/* here, we defined the blogs of SusuFQX */

const blogs =  new Mongo.Collection('blogs');

blogs.attachSchema(
  new SimpleSchema({
    title    : { type: String},
    date     : { type: String},
    text     : { type: String},
    labels   : { type: [String], optional: true}
  })
);

if (Meteor.isServer) {
  blogs.allow({
    insert : () => true,
    update : () => true,
    remove : () => false
  });
}

export default blogs;
