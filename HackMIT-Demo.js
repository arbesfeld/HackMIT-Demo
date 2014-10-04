var Photos = new Meteor.Collection("photos");

if (Meteor.isClient) {
  Template.body.helpers({
    photos: function () {
      return Photos.find({}, {sort: {"createdAt": -1}});
    }
  });

  Template.body.events({
    'click button': function () {
      var cameraOptions = {
        width: 400,
        height: 300
      };

      MeteorCamera.getPicture(cameraOptions, function (error, data) {
        Photos.insert({data: data});
        Meteor.call('postTweet');
      });
    }
  });
}

if (Meteor.isServer) {
  var twitter = new TwitterApi();

  Meteor.methods({
    postTweet: function () {
      if (Meteor.user())
        twitter.postTweet('Learning Meteor at HackMIT!');
    }
  });
}