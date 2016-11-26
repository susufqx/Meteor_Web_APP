module.exports = {
  servers: {
    one: {
      host: '195.83.10.82',
      username: 'susufqx'
      // pem:
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'SusuFQX',
    path: '../../Meteor_Blog_Testing',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      PORT: '8010',
      ROOT_URL: 'http://www.susufqx.com',
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    //dockerImage: 'kadirahq/meteord'
    docker: {
      //image: 'kadirahq/meteord', // (optional)
      image: 'abernix/meteord:base', // use this image if using Meteor 1.4+
      args:[ // lets you add/overwrite any parameter on the docker run command (optional)
        "--link=myCustomMongoDB:myCustomMongoDB", // linking example
        "--memory-reservation 200M" // memory reservation example
      ]
    },
    deployCheckWaitTime: 200
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
