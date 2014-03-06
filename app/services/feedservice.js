var FeedService = function() {
  var userservice = require('../services/userservice');

  this.addFeed = function(userModel, feedModel, action) {
    var self = this;
    userModel.addFeed(feedModel);
    userModel.save(function(err, data) {
      if (err) {
        action(err, null);
      } else {
        data.getFeeds(function(err, data) {
          action(null, data);
        });
      }
    });
  };

  this.postTweetToFeed = function(feedModel, tweetMode, action) {
    var self = this;
    feedModel.addTweet(tweetModel);
    tweetModel.save(function(err, data) {
      if (err) {
        action(err, null);
      } else {
        action(null, data);
      }
    });
  };

  this.getTweetsToDisplay = function(feeds, selectedFeed, action) {

    var tweets = new Array();

    if (selectedFeed == -1) {
      (function() {
        if (feeds.length > 0) {
          for (var i=0, len=feeds.length; i<len; i++) {
            feeds[i].getTweets(function(err, feedTweets) {
              tweets.concat(feedTweets);
              if (i == len-1) {
                action(tweets);
              }
            });
          }
        } else {
          action([]);
        }
      }());
    }
  };
}

module.exports = new FeedService();
