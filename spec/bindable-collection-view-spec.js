describe('kona.BindableCollectionView', function() {
  var data, view, callback;
  beforeEach(function() {
    data = new kona.BindableCollection([1,2,3,4,5]);
    view = new kona.BindableCollectionView(data, {limit: 2, offset: 2});
    callback = jasmine.createSpy("callback");
  });

  describe('#all', function() {
    it('proxies and caches the data', function() {
      spyOn(data, 'all').andCallThrough();
      view.all();
      view.all();
      expect(view.all()).toEqual([3,4]);
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
    beforeEach(function() {
      view.bind("added", callback);
      view.all();
    });

    describe('inside limited slice', function() {
      beforeEach(function() {
        data.insert("new", 3);
      });

      it('updates the view', function() {
        expect(view.all()).toEqual([3, "new"]);
      });

      it('fires the "added" event with item and local index', function() {
        expect(callback).toHaveBeenCalled();
        expect(callback.argsForCall[0][1]).toEqual("new");
        expect(callback.argsForCall[0][2]).toEqual(1);
      });
    });

    describe('outside the limited slice', function() {
      beforeEach(function() {
        data.insert("outside", 4);
      });

      it('does not update the view', function() {
        expect(view.all()).toEqual([3,4]);
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
        data.remove(3); // 3 is the object being removed, not the index
      });

      it('updates the view', function() {
        expect(view.all()).toEqual([4,5]);
      });

      it('fires the "removed" event with local index', function() {
        expect(callback).toHaveBeenCalled();
        expect(callback.argsForCall[0][1]).toEqual(3); // obj
        expect(callback.argsForCall[0][2]).toEqual(0); // local index
      });
    });

    describe('before limited slice', function() {
      beforeEach(function() {
        data.remove(1); // 1 is the first object;
      });

      it('updates the view', function() {
        expect(view.all()).toEqual([4,5]);
      });

      it('fires the "removed" event with negative local index', function() {
        expect(callback).toHaveBeenCalled();
        expect(callback.argsForCall[0][1]).toEqual(1); // obj
        expect(callback.argsForCall[0][2]).toEqual(-2); // local index
      });
    });

    describe('after limited slice', function() {
      beforeEach(function() {
        data.remove(5); // after the slice
      });

      it('does not update the view', function() {
        expect(view.all()).toEqual([3,4]);
      });

      it('does not fire the "removed" event', function() {
        expect(callback).not.toHaveBeenCalled();
      });
    });
  });
});
