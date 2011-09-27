describe('Binded elements', function() {
  var obj, el, obj2;

  beforeEach(function() {
    obj = new kona.BindableObject({name: "Chris", kind: "user"});
    el = $("<p>", {text: "Welcome to the site", id: "welcome"});
  });

  describe('binding a single property', function() {
    describe('with no translation function', function() {
      beforeEach(function() {
        el.bindToProperty("html", obj.name);
      });

      it('initially populates the property', function() {
        expect(el.html()).toEqual("Chris");
      });

      it('updates the property when obj is changed', function() {
        obj.name("Giuseppe");
        expect(el.html()).toEqual("Giuseppe");
      });
    });

    describe('with translation function', function() {
      beforeEach(function() {
        el.bindToProperty("html", obj.name, function(val) {
          return "Hello " + val + "!!!";
        });
      });

      it('populates property with return val of translator', function() {
        expect(el.html()).toEqual("Hello Chris!!!");
      });
    });
  });

  describe('binding many properties', function() {
    beforeEach(function() {
      obj2 = new kona.BindableObject({code: "gibberish"});
      el.bindToProperties({
        html: obj.name,
        id: obj2.code
      });
    });

    it('initially populates the properties', function() {
      expect(el.attr("id")).toEqual("gibberish");
      expect(el.html()).toEqual("Chris");
    });

    it('updates the properties when objs are changed', function() {
      obj.name("Giuseppe");
      obj2.code("my-new-id");
      expect(el.attr("id")).toEqual("my-new-id");
      expect(el.html()).toEqual("Giuseppe");
    });
  });
});
