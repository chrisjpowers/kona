(function($) {
  $.extend($.fn, {
    bindToObject: function(obj, options) {
      function updateField(binded, key, val) {
        val = val || null;
        if(binded.is("form")) {
          var input = binded.find("[name='" + key + "']");
          input.val(val);
        } else if(binded.is("input")) {
          if(options.property || binded.attr('name') === key) {
            binded.val(val);
          }
        }
      }

      function onFieldChanged(e) {
        var input = $(this),
            name = input.attr("name"),
            value = input.val();
        $binded.data("boundObject")[name](value);
      }

      function removeCurrentBindings() {
        var oldObj = $binded.data("boundObject");
        if(oldObj) {
          oldObj.bind("changed", onObjectChanged);
          oldObj.bind("added", onObjectChanged);
          oldObj.bind("removed", onObjectChanged);
        }

        if($binded.is("form")) {
          $binded.undelegate(":input", "change", onFieldChanged);
        }
        else if($binded.is(":input")) {
          $binded.unbind("change", onFieldChanged);
        }
      }

      function onObjectChanged(event, key, val) {
        updateField($binded, key, val);
      }

      var $binded = this;
      options = options || {};
      
      removeCurrentBindings();

      $binded.data("boundObject", obj);

      $.each(obj.properties, function(i, key) {
        updateField($binded, key, obj[key]());
      });

      obj.bind("changed", onObjectChanged);
      obj.bind("added", onObjectChanged);
      obj.bind("removed", onObjectChanged);

      if($binded.is("form")) {
        $binded.delegate(":input", "change", onFieldChanged);
      }
      else if($binded.is(":input")) {
        $binded.change(onFieldChanged);
      }
    }
  });
})(jQuery);
