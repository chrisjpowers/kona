describe('binded objects', function() {
  var obj, form, nameField, genderField;
  beforeEach(function() {
    obj = new kona.BindableObject({name: "Chris", age: 29});
    form = $("<form><input name='name' type='text' /><select name='age'><option value='28'>28</option><option value='29'>29</option><input type='text' name='gender' /></form>");
    nameField = form.find('[name="name"]');
    genderField = form.find('[name="gender"]');
  });

  describe('binding form', function() {
    beforeEach(function() {
      form.bindToObject(obj);
    });

    it('immediately sets the value', function() {
      expect(nameField.val()).toEqual("Chris");
    });

    it('changes the value when updated', function() {
      obj.name("Joe");
      expect(nameField.val()).toEqual("Joe");
    });

    it('immediately updates if the property is added', function() {
      expect(genderField.val()).toBeFalsy();
      obj.add("gender", "male");
      expect(genderField.val()).toEqual("male");
    });

    it('immediately removes value if the property is removed', function() {
      expect(nameField.val()).toEqual("Chris");
      obj.remove("name");
      expect(nameField.val()).toBeFalsy();
    });
  });

  describe('binding input', function() {
    beforeEach(function() {
      nameField.bindToObject(obj);
    });

    it('immediately sets the value', function() {
      expect(nameField.val()).toEqual("Chris");
    });

    it('changes the value when updated', function() {
      obj.name("Joe");
      expect(nameField.val()).toEqual("Joe");
    });

    it('immediately updates if the property is added', function() {
      genderField.bindToObject(obj);
      expect(genderField.val()).toBeFalsy();
      obj.add("gender", "male");
      expect(genderField.val()).toEqual("male");
    });

    it('immediately removes value if the property is removed', function() {
      expect(nameField.val()).toEqual("Chris");
      obj.remove("name");
      expect(nameField.val()).toBeFalsy();
    });

    it('binds to a given key', function() {
      nameField.bindToObject(obj, {property: 'age'});
      expect(nameField.val()).toEqual("29");
    });
  });
});
