(function(root) {
  'use strict';

  root.Util = {
    // stripAccents from @Tomalak on stackoverflow
    // http://stackoverflow.com/questions/286921/efficiently-replace-all-accented-characters-in-a-string
    
    stripAccents: function() {
        var in_chrs   = 'àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ',
            out_chrs  = 'aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY',
            chars_rgx = new RegExp('[' + in_chrs + ']', 'g'),
            transl    = {},
            lookup    = function (m) { return transl[m] || m; };

        for (var i=0; i<in_chrs.length; i++) {
          transl[in_chrs[i]] = out_chrs[i];
        }

        return function(s) { return s.replace(chars_rgx, lookup) };
    }(),

    snakeCase: function(s) {
      return this.stripAccents(s)
                 .trim()
                 .replace(/[\' -]/g, " ") // replace ' and - with spaces
                 .replace(/[^a-zA-Z\d\s]/g, "") // remove non characters and digits
                 .replace(/ +/g, " ") // replace double spaces with single spaces
                 .split(" ")
                 .join("_");
    }
  };
}(this));
