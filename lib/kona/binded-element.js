(function($) {
  $.extend(kona.jQueryProxy, {
    bindToProperty: function(setterName, property, translator) {
      var $binded = this;

      function updateValue(name, val) {
        if(translator) { val = translator(val); }
        if(_.isFunction($binded[name])) {
          $binded[name](val);
        }
        else {
          $binded.attr(name, val);
        }
      }

      var initialValue = property();
      updateValue(setterName, initialValue);

      property.change(function(newVal, origVal) {
        updateValue(setterName, newVal);
      });
    },

    bindToProperties: function(propertyMap) {
      var $binded = this;
      _.each(propertyMap, function(property, setterName) {
        kona.jQueryProxy.bindToProperty.call($binded, setterName, property);
      });
    }
  });
})(jQuery);
