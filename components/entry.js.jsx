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
      // parse entry title into TED embedded video url
      var title          = this.props.entry.title.toLowerCase().split("|"), // ["author name", "title of video"]
          videoTitle     = Util.snakeCase(title[0]), // title_of_video
          author         = Util.snakeCase(title[1]), // author_name
          snakeTitle     = author + "_" + videoTitle, // author_name_title_of_video
          url            = "https://embed-ssl.ted.com/talks/" +
                           snakeTitle + ".html";

      return <iframe src={url} height="360"
                     frameBorder="0" scrolling="no"
                     webkitAllowFullScreen mozallowfullscreen
                     allowFullScreen
                     id="video"></iframe>;
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
