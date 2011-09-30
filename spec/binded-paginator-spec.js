describe('$.fn.kona("paginator")', function() {
  var paginator, data, view;
  beforeEach(function() {
    data = kona(["a", "b", "c", "d", "e"]);
    view = kona(data, {limit: 2, page: 1});
    paginator = $("<div>");
    paginator.kona("paginator", view);
  });

  describe('building paginator', function() {
    it('has a next link', function() {
      var next = paginator.find("a.next");
      expect(next.html()).toEqual("Next");
    });

    it('has disabled previous link', function() {
      var prev = paginator.find("a.previous.disabled");
      expect(prev.html()).toEqual("Previous");
    });

    it('has a number link for each page', function() {
      var a = paginator.find("a.page-1.selected");
      expect(a.html()).toEqual("1");
      a = paginator.find("a.page-2");
      expect(a.html()).toEqual("2");
      a = paginator.find("a.page-3");
      expect(a.html()).toEqual("3");
    });

    it('selects the first number link', function() {
      var a = paginator.find("a.page-1");
      expect(a.hasClass("selected")).toBeTruthy();
    });
  });

  describe('clicking Next', function() {
    var next;
    beforeEach(function() {
      next = paginator.find("a.next");
      next.click();
    });

    it('changes the views page', function() {
      expect(view.all()).toEqual(["c", "d"]);
    });

    it('enables Previous', function() {
      expect(paginator.find("a.previous").hasClass("disabled")).toBeFalsy();
    });

    it('selects the matching number link', function() {
      expect(paginator.find(".page-1").hasClass("selected")).toBeFalsy();
      expect(paginator.find(".page-2").hasClass("selected")).toBeTruthy();
    });

    describe('at last page', function() {
      beforeEach(function() {
        view.update({page: 3});
        spyOn(view, "nextPage");
        next.click();
      });

      it('becomes disabled', function() {
        expect(next.hasClass("disabled")).toEqual(true);
      });

      it('does not run nextPage() on view', function() {
        expect(view.nextPage).not.toHaveBeenCalled();
      });
    });
  });

  describe('clicking Previous', function() {
    var prev;
    beforeEach(function() {
      view.update({page: 3});
      prev = paginator.find("a.previous");
      prev.click();
    });

    it('changes the views page', function() {
      expect(view.all()).toEqual(["c", "d"]);
    });

    it('enables Next', function() {
      expect(paginator.find("a.next").hasClass("disabled")).toBeFalsy();
    });

    it('selects the matching number link', function() {
      expect(paginator.find(".page-3").hasClass("selected")).toBeFalsy();
      expect(paginator.find(".page-2").hasClass("selected")).toBeTruthy();
    });

    describe('at first page', function() {
      beforeEach(function() {
        spyOn(view, "previousPage");
        view.update({page: 1});
        prev.click();
      });

      it('becomes disabled', function() {
        expect(prev.hasClass("disabled")).toEqual(true);
      });

      it('does not run previousPage() on view', function() {
        expect(view.previousPage).not.toHaveBeenCalled();
      });
    });
  });

  describe('clicking a number', function() {
    var num;
    beforeEach(function() {
      num = paginator.find("a.page-2");
      num.click();
    });

    it('changes the views page', function() {
      expect(view.all()).toEqual(["c", "d"]);
    });
  });

  describe('clicking an already selected number', function() {
    var num;
    beforeEach(function() {
      spyOn(view, "gotoPage");
      num = paginator.find("a.page-1");
      num.click();
    });

    it('does not run gotoPage on view', function() {
      expect(view.gotoPage).not.toHaveBeenCalled();
    });
  });

  describe('reacting to view options change', function() {
    it('adds numbers when pages are added', function() {
      view.update({limit: 1}); // 5 pages of 1 each
      expect(paginator.find(".page").length).toEqual(5);
    });

    it('removes numbers when pages are removed', function() {
      view.update({limit: 3}); // 2 pages of 3 each
      expect(paginator.find(".page").length).toEqual(2);
    });
  });
});

