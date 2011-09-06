var kona = kona || {};

(function($) {
  kona.BindableObject = function BindableObject(origObj) {
    this.notifier = $({});
    this.data = {};
    this.properties = [];
    for(var key in origObj) {
      this.add(key, origObj[key]); 
    }
  };

  kona.BindableObject.prototype = {
    add: function(key, initVal) {
      this[key] = function(val) {
        if(val) {
          var orig = this.data[key];
          this.data[key] = val;
          this.trigger("changed", [key, val, orig]);
        } else {
          return this.data[key];
        }
      };
      this.data[key] = initVal;
      this.properties.push(key);
      this.trigger("added", [key, initVal]);
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

  };
})(jQuery);
