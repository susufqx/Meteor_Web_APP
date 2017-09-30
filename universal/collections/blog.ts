/* here, we defined the blogs of SusuFQX */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const blogs =  new Mongo.Collection('blogs');

(<any>blogs).attachSchema(
  new SimpleSchema({
    userID   : { type: String},
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
