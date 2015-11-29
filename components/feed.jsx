(function(root) {
  'use strict';

  root.Feed = React.createClass({
    render: function() {
      return (
        <div id="feed-view">
        <h1>{this.props.feed.title}</h1>
        {
          this.props.feed.entries.map(function(entry) {
            return <Entry entry={entry} key={entry.title}/>;
          })
        }
        </div>
      );
    }
  });
}(this));
