describe('binded objects', function() {
  var obj, form, nameField, genderField;
  beforeEach(function() {
    obj = new kona.BindableObject({name: "Chris", age: 29});
    form = $("<form><input name='name' type='text' /><select name='age'><option value='28'>28</option><option value='29'>29</option><input type='text' name='gender' /></form>");
    nameField = form.find('[name="name"]');
    genderField = form.find('[name="gender"]');
    ageField = form.find('[name="age"]');
  });

  describe('with binded form', function() {
    beforeEach(function() {
      form.bindToObject(obj);
    });

    describe('receiving changes from obj', function() {
      it('immediately sets the field values', function() {
        expect(nameField.val()).toEqual("Chris");
        expect(ageField.val()).toEqual("29");
      });

      it('changes the field value when updated', function() {
        obj.name("Joe");
        expect(nameField.val()).toEqual("Joe");
      });

      it('immediately updates fields if the property is added', function() {
        expect(genderField.val()).toBeFalsy();
        obj.add("gender", "male");
        expect(genderField.val()).toEqual("male");
      });

      it('immediately removes field value if the property is removed', function() {
        expect(nameField.val()).toEqual("Chris");
        obj.remove("name");
        expect(nameField.val()).toBeFalsy();
      });
    });

    describe('pushing changes to obj', function() {
      it('updates the existing property when field is changed', function() {
        nameField.val("Giuseppe").change();
        expect(obj.name()).toEqual("Giuseppe");
      });
    });

    describe('rebinding', function() {
      var obj2;
      beforeEach(function() {
        obj2 = new kona.BindableObject({name: "Giuseppe", age: 89});
        form.bindToObject(obj2);
      });

      it('unbinds old object when new one is binded', function() {
        nameField.val("Jack").change();
        expect(obj.name()).toEqual("Chris");
        expect(obj2.name()).toEqual("Jack");
      });
    });
  });

  describe('binding input', function() {
    beforeEach(function() {
      nameField.bindToObject(obj);
    });

    describe('receiving changes from obj', function() {
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

    describe('pushing changes to obj', function() {
      it('updates the property when field is changed', function() {
        nameField.val("Giuseppe").change();
        expect(obj.name()).toEqual("Giuseppe");
      });
    });
  });
});
