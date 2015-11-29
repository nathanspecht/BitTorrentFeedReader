"use strict";

(function (root) {
  'use strict';

  root.Feed = React.createClass({
    displayName: "Feed",

    render: function render() {
      return React.createElement(
        "div",
        { id: "feed-view" },
        React.createElement(
          "h1",
          null,
          this.props.feed.title
        ),
        this.props.feed.entries.map(function (entry) {
          return React.createElement(Entry, { entry: entry, key: entry.title });
        })
      );
    }
  });
})(this);
