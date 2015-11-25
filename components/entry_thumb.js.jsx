(function(root) {
  'use strict';
  root.EntryThumb = React.createClass({
    getInitialState: function() {
      return {expanded: false};
    },

    toggleContent: function() {
      this.setState({expanded: !this.state.expanded})
    },

    fullContent: function() {
      return {__html: this.props.entry.content}
    },

    render: function() {
      return(
        <div id="entry-info" onClick={this.toggleContent}>
          <h3>{this.props.entry.title}</h3>
          {
            this.state.expanded ?
              <div id="full-content"
                dangerouslySetInnerHTML={this.fullContent()}>
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
