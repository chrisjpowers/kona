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

  global.kona = kona;
})(window, jQuery);
