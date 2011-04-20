describe('kona.BindableCollectionView', function() {
  var data, view, callback;
  beforeEach(function() {
    data = new kona.BindableCollection(["a", "b", "c", "d", "e"]);
    view = new kona.BindableCollectionView(data, {limit: 2, offset: 2});
    callback = jasmine.createSpy("callback");
  });

  describe('#all', function() {
    it('proxies and caches the data', function() {
      spyOn(data, 'all').andCallThrough();
      view.all();
      view.all();
      expect(view.all()).toEqual(["c", "d"]);
      expect(data.all.callCount).toEqual(1);
    });
  });

  describe('options', function() {
    beforeEach(function() {
      view = new kona.BindableCollectionView(data, {limit: 2, offset: 3});
    });   
    
    it('has a limit option', function() {
      expect(view.limit).toEqual(2);
      view.limit = 3;
      expect(view.limit).toEqual(3);
    });


    it('has a offset option', function() {
      expect(view.offset).toEqual(3);
      view.offset = 4;
      expect(view.offset).toEqual(4);
    });
  });

  describe('binding to "added" data event', function() {
    var removedCallback;
    beforeEach(function() {
      view.bind("added", callback);
      removedCallback = jasmine.createSpy("removedCallback");
      view.bind("removed", removedCallback);
      view.all();
    });

    describe('inside limited slice', function() {
      beforeEach(function() {
        data.insert("new", 3);
      });

      it('updates the view', function() {
        expect(view.all()).toEqual(["c", "new"]);
      });

      it('fires the "added" event with item and local index', function() {
        expect(callback).toHaveBeenCalled();
        expect(callback.argsForCall[0][1]).toEqual("new");
        expect(callback.argsForCall[0][2]).toEqual(1);
      });

      it('fires the "removed event with item popped off view and its local index', function() {
        expect(removedCallback).toHaveBeenCalled();
        expect(removedCallback.argsForCall[0][1]).toEqual("d");
        expect(removedCallback.argsForCall[0][2]).toEqual(1);
      });
    });

    describe('before the limited slice', function() {
      beforeEach(function() {
        data.insert("before", 0);
      });

      it('updates the view', function() {
        expect(view.all()).toEqual(["b", "c"]);
      });

      it('fires the "added" event with item pushed onto view and local index', function() {
        expect(callback).toHaveBeenCalled();
        expect(callback.argsForCall[0][1]).toEqual("b");
        expect(callback.argsForCall[0][2]).toEqual(0);
      });

      it('fires the "removed event with item popped off view and its local index', function() {
        expect(removedCallback).toHaveBeenCalled();
        expect(removedCallback.argsForCall[0][1]).toEqual("d");
        expect(removedCallback.argsForCall[0][2]).toEqual(1);
      });
    });

    describe('after the limited slice', function() {
      beforeEach(function() {
        data.insert("outside", 4);
      });

      it('does not update the view', function() {
        expect(view.all()).toEqual(["c", "d"]);
      });

      it('does not fire the "added" event', function() {
        expect(callback).not.toHaveBeenCalled();
      });
    });
  });

  describe('binding to "removed" data event', function() {
    beforeEach(function() {
      view.bind("removed", callback);
      view.all();
    });

    describe('inside limited slice', function() {
      beforeEach(function() {
        data.remove("c");
      });

      it('updates the view', function() {
        expect(view.all()).toEqual(["d", "e"]);
      });

      it('fires the "removed" event with local index', function() {
        expect(callback).toHaveBeenCalled();
        expect(callback.argsForCall[0][1]).toEqual("c");
        expect(callback.argsForCall[0][2]).toEqual(0);
      });
    });

    describe('before limited slice', function() {
      var addedCallback;
      beforeEach(function() {
        addedCallback = jasmine.createSpy("addedCallback");
        view.bind("added", addedCallback);
        data.remove("a");
      });

      it('updates the view', function() {
        expect(view.all()).toEqual(["d", "e"]);
      });

      it('fires the "removed" event with item dropped from view and its index', function() {
        expect(callback).toHaveBeenCalled();
        expect(callback.argsForCall[0][1]).toEqual("c");
        expect(callback.argsForCall[0][2]).toEqual(0);
      });

      it('fires the "added" event with item that drops into view and its index', function() {
        expect(addedCallback).toHaveBeenCalled();
        expect(addedCallback.argsForCall[0][1]).toEqual("e");
        expect(addedCallback.argsForCall[0][2]).toEqual(1);
      });
    });

    describe('after limited slice', function() {
      beforeEach(function() {
        data.remove("e"); // after the slice
      });

      it('does not update the view', function() {
        expect(view.all()).toEqual(["c", "d"]);
      });

      it('does not fire the "removed" event', function() {
        expect(callback).not.toHaveBeenCalled();
      });
    });
  });
});
