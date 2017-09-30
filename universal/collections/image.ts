import { FileCollection } from 'vsivsi:file-collection';

const image = new FileCollection('image',{
  resumable: true,
  resumableIndexName: 'image',
  http: [
    {
      method: 'get',
      path:'/md5/:md5',
      lookup: (params) => {
        return {
          md5: params.md5
        };
      }
    }
  ]
});

if (Meteor.isServer) {
  image.allow({
    insert: function (userId, image) {
      image.metadata = image.metadata || {};
      image.metadata.owner = userId;
      return true;
    },
    remove: function (userId, image) {
      return (userId === image.metadata.owner);
    },
    read: function () {
      return true;
    },
    write: function (userId, image) {
      return (userId === image.metadata.owner);
    }
  });
}

export default image;
