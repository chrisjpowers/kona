describe('kona.BindableObject', function() {
  var obj, callback;
  beforeEach(function() {
    obj = kona({name: "Chris"});
    callback = jasmine.createSpy('callback');
  });

  describe('init', function() {
    it('makes properties available as accessors', function() {
      expect(obj.name()).toEqual("Chris");
    });

    it('makes a setter for the property', function() {
      obj.name("Joe");
      expect(obj.name()).toEqual("Joe");
    });
  });

  describe('properties', function() {
    it('returns the keys of all properties', function() {
      expect(obj.properties).toEqual(["name"]);
      obj.add("gender", "male");
      expect(obj.properties).toEqual(["name", "gender"]);
    });
  });

  describe('add', function() {
    beforeEach(function() {
      obj.bind("added", callback);
      obj.add("gender", "male");
    });

    it('adds a property accessor with the given value', function() {
      expect(obj.gender()).toEqual('male');
    });
    
    it('triggers the added event', function() {
      expect(callback).toHaveBeenCalled();
      expect(callback.argsForCall[0][1]).toEqual("gender");
      expect(callback.argsForCall[0][2]).toEqual("male");
    });
  });

  describe('remove', function() {
    beforeEach(function() {
      obj.bind("removed", callback);
      obj.remove("name");
    });

    it('removes the property accessor with the given key', function() {
      expect(obj.gender).toBeFalsy();
    });
    
    it('triggers the removed event', function() {
      expect(callback).toHaveBeenCalled();
      expect(callback.argsForCall[0][1]).toEqual("name");
    });
  });

  describe('changing properties', function() {
    beforeEach(function() {
      obj.bind("changed", callback);
      obj.name("Joe");
    });

    it('fires changed event with new and old values', function() {
      expect(callback).toHaveBeenCalled();
      expect(callback.argsForCall[0][1]).toEqual("name");
      expect(callback.argsForCall[0][2]).toEqual("Joe");
      expect(callback.argsForCall[0][3]).toEqual("Chris");
    });
  });

  describe('konaClass', function() {
    it('returns "BindableObject"', function() {
      expect(obj.konaClass).toEqual("BindableObject");
    });
  });
});

