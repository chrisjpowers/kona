describe('$.bindToCollection', function() {
  var list, view, data;
 
  function liValues() {
    var vals = [];
    return _.map(list.find("li"), function(li) {
      return $(li).text();
    });
  }

  describe('binding to data', function() {
    beforeEach(function() {
      data = new kona.BindableCollection(["a", "b", "c"]);
      list = $("<ul>").bindToCollection(data);
    });
    
    describe('initialization', function() {
      it('creates an <li> for each item', function() {
        expect(list.find("li").length).toEqual(3);
      });

      it('uses the data for <li> text nodes', function() {
        var lis = list.find("li");
        expect(liValues()).toEqual(["a", "b", "c"]);
      });
    });

    describe('inserting data', function() {
      it('inserts an li for the new item', function() {
        data.insert("inserted", 1);
        expect(liValues()).toEqual(["a", "inserted", "b", "c"]);
      });

      it('appends an li for new items pushed on', function() {
        data.add("added");
        expect(liValues()).toEqual(["a", "b", "c", "added"]);
      });
    });

    describe('removing data', function() {
      it('removes the li for a removed item', function() {
        data.remove("b");
        expect(liValues()).toEqual(["a", "c"]);
      });
    });

    describe('updating data', function() {
      var obj;
      beforeEach(function() {
        obj = new kona.BindableObject({name: "Chris", age: 30});
        data = new kona.BindableCollection([obj]);
        list = $("<ul>").bindToCollection(data, {
          content: function(user) { return user.name; }
        });
      });

      it("updates an li when object is changed", function() {
        obj.name("Giuseppe");
        expect(list.find("li").html()).toEqual("Giuseppe");
      });
    });
  });

  describe('binding to view with limit/offset', function() {
    beforeEach(function() {
      data = new kona.BindableCollection(["a", "b", "c", "d", "e"]);
      view = new kona.BindableCollectionView(data, {limit: 2, offset: 2});
      list = $("<ul>").bindToCollection(view);
    });

    describe('initialization', function() {
      it('creates an <li> for each item in view', function() {
        expect(list.find("li").length).toEqual(2);
      });

      it('uses the data for <li> text nodes', function() {
        var lis = list.find("li");
        expect(liValues()).toEqual(["c", "d"]);
      });
    });

    describe('inserting data', function() {
      it('inserts an li for new item in view', function() {
        data.insert("inserted", 2);
        expect(liValues()).toEqual(["inserted","c"]);
      });

      it('shifts contents of view if inserted before', function() {
        data.insert("inserted", 0);
        expect(liValues()).toEqual(["b","c"]);
      });

      it('does not change if inserted after', function() {
        data.insert("inserted", 4);
        expect(liValues()).toEqual(["c", "d"]);
      });
    });

    describe('removing data', function() {
      it('removes the li for a removed item', function() {
        data.remove("b");
        expect(liValues()).toEqual(["d", "e"]);
      });
    });

    describe('with view updated', function() {
      beforeEach(function() {
        view.update({limit: 3, offset: 1});
      });

      it('should update the visible items', function() {
        expect(liValues()).toEqual(["b", "c", "d"]);
      });
    });
  });

  describe('options', function() {
    beforeEach(function() {
      data = new kona.BindableCollection(["a", "b", "c", "d", "e"]);
      list = $("<div>").bindToCollection(data, {
        tag: "p",
        content: function(item) { return "hello " + item; }
      });
    });

    it('takes a tag option', function() {
      expect(list.find("p").length).toEqual(5);
    });

    it('takes a content function', function() {
      var ps = list.find("p");
      expect(ps.eq(0).text()).toEqual("hello a");
      expect(ps.eq(1).text()).toEqual("hello b");
    });
  });
});
