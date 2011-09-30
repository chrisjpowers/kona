(function($) {
  kona.jQueryProxy = {
    bind: function() {
      var bindable = Array.prototype.slice.call(arguments, 0, 1)[0];
      if(bindable.konaClass === "BindableObject") {
        return kona.jQueryProxy.bindToObject.apply(this, arguments);
      } else if(bindable.konaClass === "BindableCollection") {
        return kona.jQueryProxy.bindToCollection.apply(this, arguments);
      } else if(_.isString(bindable)) {
        return kona.jQueryProxy.bindToProperty.apply(this, arguments);
      } else {
        return kona.jQueryProxy.bindToProperties.apply(this, arguments);
      }
    },

    binded: function() {
      return this.data("boundObject");
    }
  };

  $.extend($.fn, {
    kona: function() {
      var method = Array.prototype.slice.call(arguments, 0, 1);
      var args = Array.prototype.slice.call(arguments, 1, 10);
      return kona.jQueryProxy[method].apply(this, args);
    }
  });
})(jQuery);
