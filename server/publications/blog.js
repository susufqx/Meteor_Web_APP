import blogs from '../../universal/collections/blog.js';

if(blogs.find().count() === 0){
  blogs.insert({
    title:  "Test of the Blog One",
    date:   new Date(),
    text:   "Now my blog is nothing because it is my first blog which designed and written by myself. I don't know and I have no experiences to do it. I need to learn others' works and think more to build it. So this is just a test article.",
    labels: ["IT","Science"]
  });
  blogs.insert({
    title:  "Test of the Blog Two",
    date:   new Date(),
    text:   "Now my blog is nothing because it is my first blog which designed and written by myself. I don't know and I have no experiences to do it. I need to learn others' works and think more to build it. So this is just a test article.",
    labels: ["IT","Society"]
  });
}
export default function () {
  Meteor.publish('blogs', function () {
    return blogs.find();
  });
}
