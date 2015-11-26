(function(root) {
  'use strict';

  root.Util = {
    stripAccents: function(s) {
        var in_chrs   = 'àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ',
            out_chrs  = 'aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY',
            chars_rgx = new RegExp('[' + in_chrs + ']', 'g'),
            transl    = {},
            lookup    = function (m) { return transl[m] || m; };

        for (var i=0; i<in_chrs.length; i++) {
          transl[in_chrs[i]] = out_chrs[i];
        }

        return s.replace(chars_rgx, lookup);
    },

    snakeCase: function(s) {
      return this.stripAccents(s)
                 .trim()
                 .replace(/[\' -]/g, " ")
                 .replace(/[^a-zA-Z\d\s]/g, "")
                 .replace(/ +/g, " ")
                 .split(" ")
                 .join("_");
    }
  };
}(this));
