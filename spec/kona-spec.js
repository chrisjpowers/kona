describe('kona()', function() {
  describe('when passed an object', function() {
    var obj;
    beforeEach(function() {
      obj = {name: "Chris", age: 30};
    });

    it('returns a BindableObject', function() {
      var newObj = kona(obj);
      expect(newObj.name()).toEqual("Chris");
      expect(newObj.age()).toEqual(30);
    });
  });

  describe('when passed an array', function() {
    var arr, result;
    describe('of strings', function() {
      beforeEach(function() {
        arr = ["a", "b", "c"];
        result = kona(arr);
      });

      it('returns a BindableCollection', function() {
        expect(result.all()).toEqual(arr);
      });
    });

    describe('of objects', function() {
      beforeEach(function() {
        arr = [{name: "Chris"}, {name: "Joe"}];
        result = kona(arr);
      });

      it('returns a BindableCollection of BindableObjects', function() {
        expect(result.all()[0].name()).toEqual("Chris");
        expect(result.all()[1].name()).toEqual("Joe");
      });
    });

    describe('of BindableObjects', function() {
      beforeEach(function() {
        arr = [kona({name: "Chris"}), kona({name: "Joe"})];
        result = kona(arr);
      });

      it('returns a BindableCollection of those BindableObjects', function() {
        expect(result.all()[0].name()).toEqual("Chris");
        expect(result.all()[1].name()).toEqual("Joe");
      });
    });
  });

  describe('when passed an array and options', function() {
    var arr, result;
    beforeEach(function() {
      arr = ["a", "b", "c", "d", "e"];
      result = kona(arr, {limit: 2, offset: 2});
    });

    it('returns a BindableCollectionView', function() {
      expect(result.all()).toEqual(["c", "d"]);
    });
  });

  describe('when passed a BindableCollection and options', function() {
    var arr, result;
    beforeEach(function() {
      coll = kona(["a", "b", "c", "d", "e"]);
      result = kona(coll, {limit: 2, offset: 2});
    });

    it('returns a BindableCollectionView', function() {
      expect(result.all()).toEqual(["c", "d"]);
    });
  });
});
