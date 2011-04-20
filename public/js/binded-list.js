(function($) {
  $.extend($.fn, {
    bindToCollection: function(collection, options) {
      var list = this,
          options = options || {},
          tag = options.tag || "li",
          contentFunc = options.content || function(item) { return item; };
          
      _.each(collection.all(), function(item) {
        var node = $("<" + tag + ">", {text: contentFunc(item)});
        list.append(node);
      });
      
      collection.bind("added", function(event, item, index) {
        var lis = list.find(tag),
            markup = $("<" + tag + ">", {text: contentFunc(item)});
        if(index === lis.length) {
          list.append(markup);
        } else {
          var li = lis.eq(index);
          li.before(markup);
        }
      });

      collection.bind("removed", function(event, item, index) {
        list.find(tag).eq(index).remove();
      });

      return list;
    }
  });
})(jQuery);
