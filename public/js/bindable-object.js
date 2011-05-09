var kona = kona || {};

(function($) {
  kona.BindableObject = Class.extend({
    init: function(origObj) {
      this.notifier = $({});
      this.data = {};
      for(var key in origObj) {
        this.add(key, origObj[key]); 
      }
    },

    add: function(key, origVal) {
      this[key] = function(val) {
        if(val) {
          var orig = this.data[key];
          this.data[key] = val;
          this.trigger("changed", [val, orig]);
        } else {
          return this.data[key];
        }
      };
      this[key](origVal);
      this.trigger("added", [key, origVal]);
    },

    remove: function(key) {
      delete this[key];
      delete this.data[key];
      this.trigger("removed", [key]);
    },

    bind: function bind(eventName, callback) {
      this.notifier.bind(eventName, callback);
    },

    trigger: function trigger(eventName, args) {
      this.notifier.trigger(eventName, args);
    }

  });
})(jQuery);
