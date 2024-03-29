(function($) {
  function nextLink(view) {
    return $("<a>", {href: "#", "class": "next", text: "Next"});
  }

  function previousLink(view) {
    var a = $("<a>", {href: "#", "class": "previous", text: "Previous"});
    if(view.currentPage() == 1) { a.addClass("disabled"); }

    return a;
  }

  function pageLink(view, page) {
    var a = $("<a>", {href: "#", "class": "page page-" + page, text: page});
    if(view.currentPage() == page) { a.addClass("selected"); }
    return a;
  }

  $.extend(kona.jQueryProxy, {
    paginator: function(view) {
      var paginator = this,
          prev = previousLink(view),
          next = nextLink(view);

      function draw() {
        paginator.append(prev);
        for(var i=1; i <= view.totalPages(); i++) {
          paginator.append(pageLink(view, i));
        }
        paginator.append(next);
      }

      function ensurePageCount() {
        // Better way to do this than redrawing?
        if(paginator.find(".page").length != view.totalPages()) {
          paginator.empty();
          draw();
        }
      }

      draw();

      view.bind("updated", function(e, options) {
        ensurePageCount();

        if(view.currentPage() > 1) { 
          prev.removeClass("disabled"); 
        } else { 
          prev.addClass("disabled"); 
        }

        if(view.currentPage() === view.totalPages()) {
          next.addClass("disabled"); 
        } else { 
          next.removeClass("disabled"); 
        }

        paginator.find("a.selected").removeClass("selected");
        paginator.find(".page-" + view.currentPage()).addClass("selected");
      });

      _.each(["added", "addedToCollection", "removed", "removedFromCollection"], function(eventName) {
        view.bind(eventName, function(e, item) {
          ensurePageCount();
        });
      });

      paginator.delegate("a.next", "click", function(e) {
        e.preventDefault();
        if(!$(this).hasClass("disabled")) {
          view.nextPage();
        }
      });

      paginator.delegate("a.previous", "click", function(e) {
        e.preventDefault();
        if(!$(this).hasClass("disabled")) {
          view.previousPage();
        }
      });

      paginator.delegate("a.page", "click", function(e) {
        e.preventDefault();
        var numStr, num, $this = $(this);

        if(!$this.hasClass("selected")) {
          numStr = $(this).attr("class").match(/page-(\d+)/)[1];
          num = parseInt(numStr, 10);
          view.gotoPage(num);
        }
      });
    }
  });
})(jQuery);


