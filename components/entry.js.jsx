(function(root) {
  'use strict';

  root.Entry = React.createClass({
    getInitialState: function() {
      return {expanded: false, viewed: ""};
    },

    publishedDate: function() {
      return new Date(this.props.entry.publishedDate);
    },

    toggleContent: function() {
      this.setState({expanded: !this.state.expanded, viewed: "viewed"});
    },

    fullContent: function() {
      return {__html: this.props.entry.content};
    },

    // the video link provided in the entry content doesn't seem to work
    tedVideo: function() {
      // parse entry title into TED embedded video url
      var title          = this.props.entry.title.toLowerCase().split("|"), // => ["title of video", "author name"]
          videoTitle     = Util.snakeCase(title[0]), // removes non characters/digits and accents
          author         = Util.snakeCase(title[1]),
          snakeTitle     = author + "_" + videoTitle, // => author_name_title_of_video
          url            = "https://embed-ssl.ted.com/talks/" +
                           snakeTitle + ".html";

      return <iframe src={url} height="360"
                     frameBorder="0" scrolling="no"
                     className="video"
                     webkitAllowFullScreen mozallowfullscreen
                     allowFullScreen></iframe>;
    },

    render: function() {
      var infoClass = "entry-info",
          infoClick,
          showLessClass = "title-extra show-less",
          viewed;

      if (this.state.expanded){
        infoClass += " expanded";
      } else {
        infoClick = this.toggleContent;
        showLessClass += " hidden";
        viewed = this.state.viewed; // => "viewed" or ""
      }

      return(
        <div className={infoClass} onClick={infoClick} >
          <div className={viewed}>
            <h3>{this.props.entry.title}</h3>
            <TimeAgo className="title-extra" date={this.publishedDate()}/>
            <span className={showLessClass}
                  onClick={this.toggleContent}>Show Less</span>
            {
              this.state.expanded ?
                // full content
                <div>
                  <p dangerouslySetInnerHTML={this.fullContent()}></p>
                  <a href={this.props.entry.link}>
                    <p>Visit Site</p>
                  </a>
                  {this.tedVideo()}
                </div>
              :
                // content snippet
                <p className="snippet">
                  {this.props.entry.contentSnippet}
                </p>
            }
          </div>
        </div>
      );

    }
  });
}(this));
