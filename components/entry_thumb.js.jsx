(function(root) {
  'use strict';

  root.EntryThumb = React.createClass({
    getInitialState: function() {
      return {expanded: false};
    },

    publishedDate: function() {
      return new Date(this.props.entry.publishedDate);
    },

    toggleContent: function() {
      this.setState({expanded: !this.state.expanded});
    },

    fullContent: function() {
      return {__html: this.props.entry.content};
    },

    render: function() {
      return(
        <div id="entry-info" onClick={this.toggleContent}>
          <h3>{this.props.entry.title}</h3>
          <TimeAgo date={this.publishedDate()}/>
          {
            this.state.expanded ?
              <div id="full-content">
                <div dangerouslySetInnerHTML={this.fullContent()}></div>
                <a href={this.props.entry.link}>Visit Site</a>
              </div>
            :
              <div id="content-snippet">
                {this.props.entry.contentSnippet}
              </div>
          }
        </div>
      );

    }
  });
}(this));
