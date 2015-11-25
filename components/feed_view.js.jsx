(function(root) {
  'use strict';

  root.FeedView = React.createClass({
    render: function() {
      return (
        <div id="feed-view">
        <h1>{this.props.feed.title}</h1>
        {
          this.props.feed.entries.map(function(entry) {
            return <EntryThumb entry={entry}/>;
          })
        }
        </div>
      );
    }
  });
}(this));
