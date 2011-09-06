(function($) {
  $.extend($.fn, {
    bindToObject: function(obj, options) {
      options = options || {};

      function updateField(binded, key, val) {
        if(binded.is("form")) {
          var input = binded.find("[name='" + key + "']");
          input.val(val);
        } else if(binded.is("input")) {
          if(options.property || binded.attr('name') === key) {
            binded.val(val);
          }
        }
      }

      var $binded = this;
      $.each(obj.properties, function(i, key) {
        updateField($binded, key, obj[key]());
      });

      obj.bind("changed", function(event, key, val) {
        updateField($binded, key, val);
      });

      obj.bind("added", function(event, key, val) {
        updateField($binded, key, val);
      });

      obj.bind("removed", function(event, key) {
        updateField($binded, key, null);
      });
    }
  });
})(jQuery);
