"use strict";

(function (root) {
  'use strict';

  root.Entry = React.createClass({
    displayName: "Entry",

    getInitialState: function getInitialState() {
      return { expanded: false, read: false };
    },

    publishedDate: function publishedDate() {
      return new Date(this.props.entry.publishedDate);
    },

    toggleContent: function toggleContent() {
      this.setState({ expanded: !this.state.expanded, read: true });
    },

    fullContent: function fullContent() {
      return { __html: this.props.entry.content };
    },

    // the video link provided in the entry content doesn't seem to work
    tedVideo: function tedVideo() {
      // parse entry title into TED embedded video url
      var title = this.props.entry.title.toLowerCase().split("|"),
          // => ["title of video", "author name"]
      videoTitle = Util.snakeCase(title[0]),
          // removes non characters/digits and accents
      author = Util.snakeCase(title[1]),
          snakeTitle = author + "_" + videoTitle,
          // => author_name_title_of_video
      url = "https://embed-ssl.ted.com/talks/" + snakeTitle + ".html";

      return React.createElement("iframe", { src: url, height: "360",
        frameBorder: "0", scrolling: "no",
        webkitAllowFullScreen: true, mozallowfullscreen: true,
        allowFullScreen: true,
        id: "video" });
    },

    render: function render() {
      var infoClass = "entry-info" + (this.state.expanded ? " expanded" : ""),
          infoClick = this.state.expanded ? null : this.toggleContent,
          showLessClass = "title-extra show-less" + (this.state.expanded ? "" : " hidden");

      return React.createElement(
        "div",
        { className: infoClass,
          onClick: infoClick },
        React.createElement(
          "div",
          { className: this.state.read && !this.state.expanded ? "read" : "" },
          React.createElement(
            "h3",
            null,
            this.props.entry.title
          ),
          React.createElement(TimeAgo, { className: "title-extra", date: this.publishedDate() }),
          React.createElement(
            "span",
            { className: showLessClass,
              onClick: this.toggleContent },
            "Show Less"
          ),
          this.state.expanded ? React.createElement(
            "div",
            null,
            React.createElement("p", { dangerouslySetInnerHTML: this.fullContent() }),
            React.createElement(
              "a",
              { href: this.props.entry.link },
              React.createElement(
                "p",
                null,
                "Visit Site"
              )
            ),
            this.tedVideo()
          ) : React.createElement(
            "p",
            { className: "snippet" },
            this.props.entry.contentSnippet
          )
        )
      );
    }
  });
})(this);
