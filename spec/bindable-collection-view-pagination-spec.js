describe('kona.BindableCollectionView pagination', function() {
  var data, view;

  describe('page option', function() {
    beforeEach(function() {
      data = new kona.BindableCollection(["a", "b", "c", "d", "e"]);
      view = new kona.BindableCollectionView(data, {limit: 2, page: 2});
    });

    it('displays the given page', function() {
      expect(view.all()).toEqual(["c", "d"]);
    });
  });
});
