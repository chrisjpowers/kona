(function($) {
  var updateWithoutPagination = kona.BindableCollectionView.prototype.update;

  $.extend(kona.BindableCollectionView.prototype, {
    update: function(options) {
      if(options.page) {
        options.offset = (options.page - 1) * options.limit;
        delete options.page;
      }
      return updateWithoutPagination.call(this, options);
    }
  });

})(jQuery);
