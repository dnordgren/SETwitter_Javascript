var userservice = require('../services/userservice');
var feedservice = require('../services/feedservice');

var Tweet = function () {

  this.refreshTweets = function (req, resp, params) {
    var self = this;
    userservice.loadUserFromSession(self.session, function(err, user) {
      if (user) {
        user.getFeeds(function(err, feeds) {
          var selectedFeed = -1;
          feedservice.getTweetsToDisplay(feeds, selectedFeed, function(tweets) {
            self.respond({params: params, feeds: feeds, tweets: tweets, selectedFeed: selectedFeed}, {
            format: 'html'
            , template: 'app/views/main/_tweetView'
            , layout: false
            });
          });
        });
      }
    });
  };
}

exports.Tweet = Tweet;
