describe('$.fn.kona()', function() {
  describe('$.fn.kona("binded")', function() {
    describe('when binding a list to a collection', function() {
      var ul, collection;
      beforeEach(function() {
        ul = $("<ul>");
        collection = kona(["a", "b", "c"]);
        ul.kona("bind", collection);
      });

      it('returns the binded object', function() {
        expect(ul.kona("binded")).toEqual(collection);
      });

      it('returns a binded object for a given li', function() {
        var li = ul.find("li").eq(0);
        expect(li.kona("binded")).toEqual("a");
      });
    });

    describe('when binding a form to an object', function() {
      var form, obj;
      beforeEach(function() {
        form = $("<form>");
        obj = kona({name: "Chris"});
        form.kona("bind", obj);
      });

      it('returns the binded object', function() {
        expect(form.kona("binded")).toEqual(obj);
      });
    });
  });
});
