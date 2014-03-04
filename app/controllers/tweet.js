var userservice = require('../services/userservice');


var Tweet = function () {

  this.refreshTweets = function (req, resp, params) {
    var self = this;
    userservice.loadUserFromSession(self.session, function(err, user) {
      if (user) {
        user.getFeeds(function(err, feeds) {
          self.respond({params: params, feeds: feeds}, {
          format: 'html'
          , template: 'app/views/main/_tweetView'
          , layout: false
          });
        });
      }
    });
  };
}

exports.Tweet = Tweet;
