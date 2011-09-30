(function($) {
  $.extend(kona.jQueryProxy, {
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
            node.html(contentFunc(item));
          });
        }
        return node;
      }

      function renderList() {
        list.empty();
        _.each(collection.all(), function(item) {
          list.append(buildNode(item));
        });
      }

      this.data("boundObject", collection);
      
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

      collection.bind("updated", function(event, newOptions) {
        renderList();
      });

      renderList();

      return list;
    }
  });
})(jQuery);
