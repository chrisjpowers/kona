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
      var obj = this;
      var fun = function(val) {
        if(val) {
          var orig = obj.data[key];
          obj.data[key] = val;
          obj.trigger("changed", [key, val, orig]);
        } else {
          return obj.data[key];
        }
      };

      fun.change = function(cb) {
        obj.bind("changed", function(e, k, v, orig) {
          if(k === key) {
            cb(v, orig);
          }
        });
      };

      this[key] = fun;
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
