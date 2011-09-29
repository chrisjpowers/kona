(function(global, $) {
  var kona = function kona(obj, options) {
    if(_.isArray(obj)) {
      var arr = _.map(obj, function(item) {
        if(_.isString(item) || _.isNumber(item) ||
           _.isNull(item) || _.isArray(item) ||
           item.konaClass) {
          return item;
        } else {
          return new kona.BindableObject(item);
        }
      });

      if(_.isEmpty(options)) {
        return new kona.BindableCollection(arr);
      } else {
        var data = new kona.BindableCollection(arr);
        return new kona.BindableCollectionView(data, options);
      }
    } else if(obj.konaClass) {
      return new kona.BindableCollectionView(obj, options);
    } else {
      return new kona.BindableObject(obj);
    }
  }

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
    }
  };

  $.extend($.fn, {
    kona: function() {
      var method = Array.prototype.slice.call(arguments, 0, 1);
      var args = Array.prototype.slice.call(arguments, 1, 10);
      return kona.jQueryProxy[method].apply(this, args);
    }
  });

  global.kona = kona;
})(window, jQuery);
