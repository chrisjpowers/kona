(function($) {
  var updateWithoutPagination = kona.BindableCollectionView.prototype.update;

  function isAcceptablePage(view, page) {
    return page > 0 && page <= view.totalPages();
  }

  $.extend(kona.BindableCollectionView.prototype, {
    update: function(options) {
      this.limit = options.limit || this.limit;
      if(options.page && isAcceptablePage(this, options.page)) {
        options.offset = (options.page - 1) * this.limit;
        delete options.page;
      }
      return updateWithoutPagination.call(this, options);
    },

    currentPage: function() {
      return (this.offset / this.limit) + 1;
    },

    totalPages: function() {
      return Math.ceil(this.data.all().length / this.limit);
    },

    nextPage: function() {
      return this.gotoPage(this.currentPage() + 1);
    },

    previousPage: function() {
      return this.gotoPage(this.currentPage() - 1);
    },

    gotoPage: function(page) {
      if(isAcceptablePage(this, page)) {
        this.update({page: page});
        return this.currentPage();
      } else {
        return false;
      }
    }
  });

})(jQuery);
