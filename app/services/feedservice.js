var userservice = require('../services/userservice');

exports.addFeed = function(userModel, feedModel, action) {
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
