(function(root) {
  'use strict';

  root.Entry = React.createClass({
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

    tedVideo: function() {
      var wholeTitle     = this.props.entry.title.toLowerCase().split("|"),
          title          = Util.snakeCase(wholeTitle[0]),
          author         = Util.snakeCase(wholeTitle[1]),
          authorAndTitle = author + "_" + title,
          url            = "https://embed-ssl.ted.com/talks/" +
                           authorAndTitle + ".html";

      return <iframe src={url} width="640" height="360"
                     frameBorder="0" scrolling="no"
                     webkitAllowFullScreen mozallowfullscreen
                     allowFullScreen
                     id="video"></iframe>
    },

    render: function() {
      return(
        <div id="entry-info" onClick={this.toggleContent}>
          <h3>{this.props.entry.title}</h3>
          <TimeAgo id="time-ago" date={this.publishedDate()}/>
          {
            this.state.expanded ?
              <div id="full-content">
                <div dangerouslySetInnerHTML={this.fullContent()}></div>
                <a href={this.props.entry.link}>Visit Site</a>
                {this.tedVideo()}
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
