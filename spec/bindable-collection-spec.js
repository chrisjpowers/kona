describe('kona.BindableCollection', function() {
  var collection, callback;
  beforeEach(function() {
    callback = jasmine.createSpy("callback");
    collection = new kona.BindableCollection(["a", "b"]);
  });

  describe("#all", function() {
    it('returns all its items', function() {
      expect(collection.all()).toEqual(["a", "b"]);
    });
  
    it('has a blank collection if initialized without a collection', function() {
      expect(new kona.BindableCollection().all()).toEqual([]);
    });

    describe('with limit/offset', function() {
      beforeEach(function() {
        collection = new kona.BindableCollection([1,2,3,4,5,6,7]);
      });

      it('returns the limited array', function() {
        expect(collection.all({limit: 3})).toEqual([1,2,3]);
      });

      it('returns the offset array', function() {
        expect(collection.all({limit: 3, offset: 3})).toEqual([4,5,6]);
      });
    });
  });

  describe('two collections', function() {
    var collection2;
    beforeEach(function() {
      collection2 = new kona.BindableCollection(["c", "d"]);
    });

    it('does not mix values across instances', function() {
      expect(collection.all()).toEqual(["a", "b"]);
      expect(collection2.all()).toEqual(["c", "d"]);
    });
  });

  describe('#bind and #trigger', function() {
    beforeEach(function() {
      collection.bind("myEvent", callback);
    });

    it('runs listener functions when triggered', function() {
      collection.trigger("myEvent", ["hello"]);
      expect(callback).toHaveBeenCalled();
      expect(callback.argsForCall[0][1]).toEqual("hello");
    });
  });

  describe('#add', function() {
    beforeEach(function() {
      collection.bind("added", callback);
      collection.add("c");
    });

    it('adds an item', function() {
      expect(collection.all()).toEqual(["a", "b", "c"]);
    });

    it('publishes the "added" event with index', function() {
      expect(callback.argsForCall[0][1]).toEqual("c");
      expect(callback.argsForCall[0][2]).toEqual(2);
    });
  });

  describe('#remove', function() {
    beforeEach(function() {
      collection.bind("removed", callback);
    });

    describe('with item present', function() {
      beforeEach(function() {
        collection.remove('a');
      });

      it('removes an item', function() {
        expect(collection.all()).toEqual(["b"]);
      });

      it('publishes the "removed" event with index', function() {
        expect(callback.argsForCall[0][1]).toEqual("a");
        expect(callback.argsForCall[0][2]).toEqual(0);
      });
    });

    describe('with no matching item present', function() {
      beforeEach(function() {
        collection.remove("bogus");
      });

      it('does not publish the "removed" event', function() {
        expect(callback).not.toHaveBeenCalled();
      });
    });
  });

  describe('#removeIndex', function() {
    beforeEach(function() {
      collection.bind("removed", callback);
      collection.removeIndex(1);
    });

    it('removes the item at given index', function() {
      expect(collection.all()).toEqual(['a']);
    });

    it('fires the removed event', function() {
      expect(callback).toHaveBeenCalled();
      expect(callback.argsForCall[0][1]).toEqual("b");
      expect(callback.argsForCall[0][2]).toEqual(1);
    });
  });

  describe('#sort', function() {
    beforeEach(function() {
      collection = new kona.BindableCollection([4,2,3,1]);
    });
    
    it('sorts by the value ascending by default', function() {
      collection.sort();
      expect(collection.all()).toEqual([1,2,3,4]);
    });

    it('sorts by a given sort function', function() {
      collection.sort(function(num) {return -1 * num});
      expect(collection.all()).toEqual([4,3,2,1]);
    });

    it('fires the "sorted" event', function() {
      collection.bind("sorted", callback);
      collection.sort();
      expect(callback).toHaveBeenCalled();
    });
  });

  describe('#insert', function() {
    it('inserts the object at the given index', function() {
      collection.insert("new", 1);
      expect(collection.all()).toEqual(["a", "new", "b"]);
    });

    it('fires the "added" event with index', function() {
      collection.bind("added", callback);
      collection.insert("new", 1);
      expect(callback).toHaveBeenCalled();
      expect(callback.argsForCall[0][1]).toEqual("new");
      expect(callback.argsForCall[0][2]).toEqual(1);
    });
  });

  describe('#itemAtIndex', function() {
    it('returns the item at the given index', function() {
      expect(collection.itemAtIndex(1)).toEqual("b");
    });
  });

  describe('#view', function() {
    var view;
    beforeEach(function() {
      view = collection.view({limit: 1, offset: 1});
    });

    it('returns a BindableCollectionView with given options', function() {
      expect(view.all()).toEqual(["b"]);
    });
  });

  describe('konaClass', function() {
    it('returns "BindableCollection"', function() {
      expect(collection.konaClass).toEqual("BindableCollection");
    });
  });
});
