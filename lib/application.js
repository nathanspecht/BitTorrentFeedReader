'use strict';

(function (root) {
  'use strict';

  var feed_url = "http://feeds.feedburner.com/tedtalks_video";

  var getEntries = function getEntries() {
    var rssfeed = new google.feeds.Feed(feed_url);
    rssfeed.includeHistoricalEntries();
    rssfeed.setNumEntries(10);

    rssfeed.load(function (result) {
      renderFeed(result.feed);
    });
  };

  var renderFeed = function renderFeed(feed) {
    React.render(React.createElement(Feed, { feed: feed }), document.getElementById('feed'));
  };

  google.load("feeds", "1", {
    callback: function callback() {
      getEntries();
    }
  });
})(this);
