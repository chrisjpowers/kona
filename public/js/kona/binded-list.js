(function($) {
  $.extend($.fn, {
    bindToCollection: function(collection, options) {
      var list = this,
          options = options || {},
          tag = options.tag || "li",
          contentFunc = options.content || function(item) { return item; };
          
      function buildNode(item) {
        var node = $("<" + tag + ">", {text: contentFunc(item)});
        node.data("boundObject", item);
        if(item.bind) {
          item.bind("changed", function() {
            console.log("changed");
            node.html(contentFunc(item));
          });
        }
        return node;
      }

      _.each(collection.all(), function(item) {
        list.append(buildNode(item));
      });
      
      collection.bind("added", function(event, item, index) {
        var lis = list.find(tag),
            markup = buildNode(item);
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
