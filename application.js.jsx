(function(root) {
  'use strict';

  var feed_url = "http://feeds.feedburner.com/tedtalks_video"

  var getEntries = function() {
    var rssfeed = new google.feeds.Feed(feed_url);
    rssfeed.includeHistoricalEntries();
    rssfeed.setNumEntries(10);

    rssfeed.load(function(result){
      renderFeedView(result.feed);
    });
  };

  var renderFeedView = function(feed) {
    React.render(
      <FeedView feed={feed}/>,
      document.getElementById('feed')
    );
  };

  google.load("feeds", "1", {
    callback: function() {
      getEntries()
    }
  });

}(this));
