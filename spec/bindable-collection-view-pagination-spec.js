describe('kona.BindableCollectionView pagination', function() {
  var data, view;

  beforeEach(function() {
    data = kona(["a", "b", "c", "d", "e"]);
    view = kona(data, {limit: 2, page: 2});
  });

  describe('page option', function() {
    it('displays the given page', function() {
      expect(view.all()).toEqual(["c", "d"]);
    });

    it('can be updated', function() {
      view.update({page: 1});
      expect(view.all()).toEqual(["a", "b"]);
    });
  });

  describe('totalPages', function() {
    it('returns the number of pages based on limit', function() {
      expect(view.totalPages()).toEqual(3);
    });
  });

  describe('currentPage', function() {
    it('returns the current page number', function() {
      expect(view.currentPage()).toEqual(2);
    });
  });

  describe('nextPage', function() {
    beforeEach(function() {
      view = kona(data, {limit: 2, page: 1});
    });

    it('updates the view to the new offset', function() {
      view.nextPage();
      expect(view.currentPage()).toEqual(2);
      expect(view.all()).toEqual(["c", "d"]);
    });

    it('returns the page number', function() {
      expect(view.nextPage()).toEqual(2);
    });

    describe('when on last page', function() {
      beforeEach(function() {
        view.nextPage();
        view.nextPage();
        view.nextPage();
        view.nextPage();
      });

      it('still displays the last page', function() {
        expect(view.all()).toEqual(["e"]);
      });

      it('keeps currentPage as last page', function() {
        expect(view.currentPage()).toEqual(3);
      });

      it('returns false', function() {
        expect(view.nextPage()).toBeFalsy();
      });
    });
  });

  describe('previousPage', function() {
    beforeEach(function() {
      view = kona(data, {limit: 2, page: 3});
    });

    it('changes view to previous page', function() {
      view.previousPage();
      expect(view.all()).toEqual(["c", "d"]);
    });

    it('returns the new page number', function() {
      expect(view.previousPage()).toEqual(2);
    });

    describe('when on first page', function() {
      beforeEach(function() {
        view.previousPage();
        view.previousPage();
        view.previousPage();
        view.previousPage();
      });

      it('still displays the first page', function() {
        expect(view.all()).toEqual(["a", "b"]);
      });

      it('keeps currentPage as the first page', function() {
        expect(view.currentPage()).toEqual(1);
      });

      it('returns false', function() {
        expect(view.previousPage()).toBeFalsy();
      });
    });
  });

  describe('gotoPage', function() {
    beforeEach(function() {
      view.gotoPage(1);
    });

    it('changes the page to 1', function() {
      expect(view.all()).toEqual(["a", "b"]);
    });

    it('returns the new page number', function() {
      expect(view.gotoPage(2)).toEqual(2);
    });

    it('returns false for an unacceptable number', function() {
      expect(view.gotoPage(222)).toBeFalsy();
    });
  });
});
